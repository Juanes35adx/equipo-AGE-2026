const PIN_COLORS = {
  entrada:  "#0d6efd",
  comida:      "#fd7e14",
  bloque:  "#6f42c1",
  parqueadero: "#dc3545",
  servicios:      "#198754",
  default:   "#1a73e8",
};
 

export function createCustomMarker(poi) {
  const color = PIN_COLORS[poi.type] ?? PIN_COLORS.default;
 
  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display:       "flex",
    flexDirection: "column",
    alignItems:    "center",
    cursor:        "pointer",
    userSelect:    "none",
    transform:     "translateX(-50%)",
  });
 
  const pin = document.createElement("div");
  Object.assign(pin.style, {
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    width:           "36px",
    height:          "36px",
    borderRadius:    "50% 50% 50% 0",
    transform:       "rotate(-45deg)",
    background:      color,
    boxShadow:       "0 2px 8px rgba(0,0,0,0.35)",
    transition:      "transform 0.15s ease, box-shadow 0.15s ease",
  });
 
  const icon = document.createElement("span");
  icon.textContent = poi.icon ?? "📍";
  Object.assign(icon.style, {
    display:    "block",
    transform:  "rotate(45deg)",
    fontSize:   "16px",
    lineHeight: "1",
  });
 
  pin.appendChild(icon);
 
  wrapper.addEventListener("mouseenter", () => {
    pin.style.transform  = "rotate(-45deg) scale(1.15)";
    pin.style.boxShadow  = "0 4px 14px rgba(0,0,0,0.45)";
  });
  wrapper.addEventListener("mouseleave", () => {
    pin.style.transform  = "rotate(-45deg) scale(1)";
    pin.style.boxShadow  = "0 2px 8px rgba(0,0,0,0.35)";
  });
 
  const label = document.createElement("div");
  label.textContent = poi.name;
  Object.assign(label.style, {
    marginTop:      "4px",
    padding:        "2px 6px",
    background:     "rgba(255,255,255,0.92)",
    borderRadius:   "4px",
    fontSize:       "11px",
    fontWeight:     "600",
    whiteSpace:     "nowrap",
    color:          "#1a1a1a",
    boxShadow:      "0 1px 4px rgba(0,0,0,0.2)",
    pointerEvents:  "none",
  });
 
  wrapper.appendChild(pin);
  wrapper.appendChild(label);
 
  return wrapper;
}
 

export function createUserMarker() {
  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    position:  "relative",
    width:     "20px",
    height:    "20px",
    transform: "translateX(-50%) translateY(-50%)",
  });
 
  const pulse = document.createElement("div");
  Object.assign(pulse.style, {
    position:     "absolute",
    inset:        "-6px",
    background:   "rgba(66,133,244,0.25)",
    borderRadius: "50%",
    animation:    "pulse 2s ease-out infinite",
  });
 
  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position:     "absolute",
    inset:        "3px",
    background:   "#4285f4",
    border:       "2px solid #fff",
    borderRadius: "50%",
    boxShadow:    "0 0 0 2px rgba(66,133,244,0.5)",
    zIndex:       "1",
  });
 
  if (!document.getElementById("user-marker-keyframes")) {
    const style = document.createElement("style");
    style.id = "user-marker-keyframes";
    style.textContent = `
      @keyframes pulse {
        0%   { transform: scale(0.8); opacity: 1; }
        100% { transform: scale(2.2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
 
  wrapper.appendChild(pulse);
  wrapper.appendChild(dot);
 
  return wrapper;
}