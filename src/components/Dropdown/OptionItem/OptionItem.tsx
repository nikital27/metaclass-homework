import Text from 'components/Text';
import styles from './OptionItem.module.scss';

type OptionItemProps = {
  option: {
    key: string;
    value: string;
  };
  checked: boolean;
  onChange: () => void;
};

const OptionItem: React.FC<OptionItemProps> = ({ option, checked, onChange }) => (
  <label className={styles.option}>
    <input
      className={styles.checkbox}
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <Text view="p-16">{option.value}</Text>
  </label>
);

export default OptionItem;