import { usePortfolio } from '../context/PortfolioContext';

export function EditableText({ value, onChange, multiline = false, className = '', as = 'span' }: any) {
  const { isEditing } = usePortfolio();
  const Tag = as;

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-surface-container-highest border border-outline-variant rounded p-1 w-full text-on-surface focus:outline-none focus:border-primary-container ${className}`}
        rows={4}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-surface-container-highest border border-outline-variant rounded p-1 w-full text-on-surface focus:outline-none focus:border-primary-container ${className}`}
    />
  );
}
