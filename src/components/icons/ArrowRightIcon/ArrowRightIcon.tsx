import Icon, { IconProps } from '../Icon';


const ArrowRightIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <Icon variant='stroke' className={className} {...props}>
    <path
      d="M12.9938 29.05L22.5021 19.5416C23.625 18.4187 23.625 16.5812 22.5021 15.4583L12.9938 5.94995"
      stroke="#151411"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowRightIcon;
