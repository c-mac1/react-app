import React from "react";

interface Props {
  fullScreen: boolean;
  setFullScreen: (value: boolean) => void;
}

export default function FullScreenToggle({ fullScreen, setFullScreen }: Props) {
  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        checked={fullScreen}
        onChange={(e) => setFullScreen(e.target.checked)}
        id="fullscreen-toggle"
        style={styles.checkbox}
      />
      <label htmlFor="fullscreen-toggle" style={styles.label}>
        Fit To Screen
      </label>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",  
    justifyContent: "flex-start",  
    marginBottom: "20px", 
  },
  checkbox: {
    width: "20px",  
    height: "20px",
    borderRadius: "4px",  
    backgroundColor: "#fff",
    border: "2px solid #ccc", 
    cursor: "pointer",  
    transition: "border-color 0.3s, background-color 0.3s", 
    marginRight: "10px", 
    outline: "none",
  },
  label: {
    fontSize: "16px",
    color: "#5c5c5c",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  checkboxHover: {
    borderColor: "#36A2EB",
    backgroundColor: "#f0f8ff",
  },
  labelHover: {
    color: "#36A2EB",
  },
};

