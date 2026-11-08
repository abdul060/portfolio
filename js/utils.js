export function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function setStatus(statusId, message, isError = false) {
  const status = document.getElementById(statusId);
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("status--error", isError);
}


export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}