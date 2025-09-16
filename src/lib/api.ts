type RequestInterceptor = (input: RequestInfo, init?: RequestInit) => Promise<[RequestInfo, RequestInit?]> | [RequestInfo, RequestInit?];
type ResponseInterceptor = (res: Response) => Promise<Response> | Response;

const baseUrl = process.env.REACT_APP_API_URL || 'http://0.0.0.0:3000';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export function addRequestInterceptor(fn: RequestInterceptor) {
  requestInterceptors.push(fn);
}
export function addResponseInterceptor(fn: ResponseInterceptor) {
  responseInterceptors.push(fn);
}

async function runRequestInterceptors(input: RequestInfo, init?: RequestInit) {
  let curInput = input;
  let curInit = init;
  for (const it of requestInterceptors) {
    // eslint-disable-next-line no-await-in-loop
    const out = await it(curInput, curInit);
    curInput = out[0];
    curInit = out[1];
  }
  return [curInput, curInit] as [RequestInfo, RequestInit | undefined];
}

async function runResponseInterceptors(res: Response) {
  let cur = res;
  for (const it of responseInterceptors) {
    // eslint-disable-next-line no-await-in-loop
    cur = await it(cur);
  }
  return cur;
}

async function apiFetch(path: string, init?: RequestInit & { body?: any }) {
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
  const [input, transformedInit] = await runRequestInterceptors(url, init);
  const res = await fetch(input, transformedInit);
  const final = await runResponseInterceptors(res);
  if (!final.ok) {
    let body: any = null;
    try { body = await final.json(); } catch (e) { /* ignore */ }
    const err: any = new Error(body?.message || `Request failed: ${final.status}`);
    err.status = final.status;
    err.body = body;
    throw err;
  }
  const contentType = final.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return final.json();
  return final.text();
}

// Default interceptors: JSON body + auth header from localStorage
addRequestInterceptor(async (input, init: RequestInit & { body?: any } = {}) => {
  const headers = new Headers(init.headers || {});
  if (init.body !== undefined && init.body !== null && typeof init.body === 'object') {
    headers.set('Content-Type', 'application/json');
    // safe stringify
    init.body = JSON.stringify(init.body);
  }
  const token = localStorage.getItem('auth_token');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return [input, { ...init, headers }];
});

addResponseInterceptor(async (res) => {
  if (res.status === 401) {
    // auto logout could be handled here
    localStorage.removeItem('auth_token');
  }
  return res;
});

// Public API
export async function login(email: string, password: string) {
  return apiFetch('/login', { method: 'POST', body: {user: { email, password }} as any });
}

export async function signup(payload: { firstName: string; lastName?: string; email: string; mobile?: string; password: string; }) {
    const { firstName, lastName } = payload;
    // remove empty string fields (mobile '') so backend unique index won't see duplicate empty values
    const userRaw: Record<string, any> = { ...payload } as any;
    Object.keys(userRaw).forEach((k) => {
      if (userRaw[k] === '') delete userRaw[k];
    });
    const user = {
      ...userRaw,
      first_name: firstName,
      last_name: lastName,
      account_name: 'public',
    };
    // remove original camelCase keys to avoid duplication
    delete (user as any).firstName;
    delete (user as any).lastName;
    return apiFetch('/signup', { method: 'POST', body: { user } as any });
}

export async function createTask(payload: { title: string; description?: string; priority?: string; dueDate?: string; dueTime?: string; status?: string; }) {
  // payload will be wrapped by server expectations; send as { task: { ... } }
  const body = { task: payload } as any;
  return apiFetch('/tasks', { method: 'POST', body });
}

const api = { login, signup, addRequestInterceptor, addResponseInterceptor };

export default api;
