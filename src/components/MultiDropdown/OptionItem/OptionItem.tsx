import Text from 'components/Text';
import styles from './OptionItem.module.scss';

type OptionItemProps = {
  option: {
    key: string;
    value: string;
  };
  checked: boolean;
  onChange: (option: { key: string; value: string }, checked: boolean) => void;
};

const OptionItem: React.FC<OptionItemProps> = ({ option, checked, onChange }) => (
  <label className={styles.option}>
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(option, e.target.checked)}
    />
    <Text view="p-16">{option.value}</Text>
  </label>
);

export default OptionItem;