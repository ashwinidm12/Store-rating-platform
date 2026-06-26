export const SearchBar = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
  />
);
