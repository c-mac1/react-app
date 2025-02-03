import React from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px', 
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '20px', 
    outline: 'none', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    transition: 'border-color 0.3s, box-shadow 0.3s', 
    color: '#5c5c5c',
  },
};

