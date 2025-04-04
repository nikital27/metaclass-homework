import Icon, { IconProps } from '../Icon';


const CheckIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <Icon variant='stroke' className={className} {...props}>
    <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
  </Icon>
);

export default CheckIcon;
