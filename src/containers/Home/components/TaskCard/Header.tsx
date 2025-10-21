import PriorityBadge from '../../../../components/ui/PriorityBadge';
import { Priority } from '../../model';
import Typography from '../../../../components/ui/Typography';

type HeaderProps = {
  title: string;
  priority: Priority;
};

const Header = ({ title, priority }: HeaderProps) => {
    const { HeaderText } = Typography;

    const truncate = (s?: string, n = 50) => {
        if (!s) return '';
        return s.length > n ? s.slice(0, n - 1) + '…' : s;
    };

  return (
           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PriorityBadge priority={priority} blinkDot showDot/>
            <HeaderText title={title} style={{marginBottom: "0px"}}>{truncate(title, 50)}</HeaderText>
         </div>
  );
};

export default Header;