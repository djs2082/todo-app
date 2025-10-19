import React, { useEffect } from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import { useUpdatePasswordForm }  from './useUpdatePasswordForm';
import { useResponsive, ValidationResult } from '@karya_app1/rain-js';
import { updatePassword } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';
import Typography from '../ui/Typography';

interface UpdatePasswordProps {
}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
  
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isMobile } = useResponsive();
  const { token } = useParams<{ token: string }>();

  const { Title } = Typography;

    const { form, submit, isPasswordFocused, values, validatorInstance, clearAllErrors, clearFieldError } = useUpdatePasswordForm({
        onSubmit: async (vals) => {
            try{
                await updatePassword({
                    token: token || '',
                    password: vals.password,
                    confirmPassword: vals.confirmPassword,
                });
                navigate('/', { replace: true });
            }
            catch(err){

    
            }
        },
        onChange: (values: any, delta: any) => {
           clearFieldError(delta.name);
        },
    });

    const { addRule } = validatorInstance;
    useEffect(() => {
        addRule('validate_match:password', (value: unknown, options?: Record<string, unknown>) => {
            const isPasswordSame = value === values.password;
            return { key: 'validate_match:password', success: isPasswordSame, fail: !isPasswordSame, message: "Passwords do not match" } as ValidationResult;
        });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.confirmPassword, values.password]);

    const bg = `${process.env.PUBLIC_URL || ''}/images/landing-bg_${theme === 'dark' ? 'dark' : 'light'}.png`;

    return (
      <div className={`page-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <Card style={{ maxWidth: isMobile ? 600 : 480, width: '100%', padding: isMobile ? 4 : 24, textAlign: 'center', height: 'auto' }}>
        <div>
        <Title>Update Your Password</Title>
      
         <Robot hide={isPasswordFocused} />
            {form}
            <div style={{display:'flex', gap: 8, marginTop:32}}>
              <Button color="primary" variant="contained" onClick={submit} disabled={false}>Update</Button>
            </div>
        </div>
      </Card>
      </div>
    )
  }
  
export default UpdatePassword;