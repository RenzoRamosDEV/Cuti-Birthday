// Paleta de colores y utilidades base compartidas por toda la app

const SCRAP = {
  paper:      '#f3e9d2',
  paperDeep:  '#e9dcb8',
  paperLight: '#fdfbf3',
  ink:        '#3a2a1a',
  inkSoft:    '#6b5239',
  red:        '#c54a3a',
  blue:       '#4a6a8a',
  green:      '#5d7a4f',
  yellow:     '#e3b34a',
};

// FNV-1a hash — genera un número determinista a partir de un string (para seeds de fotos)
function hashStr(s){
  let h = 2166136261;
  for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}

Object.assign(window, { SCRAP, hashStr });
