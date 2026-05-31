import { API_BASE_URL } from "./config.js";


async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  let response;

  try {
    response = await fetch(url, options);
  } catch (e) {
    
    throw { status: 0, message: "Помилка мережі або CORS", details: String(e) };
  }

  const rawText = await response.text();

  
  if (!response.ok) {
    let errPayload = null;
    try { errPayload = JSON.parse(rawText); } catch {}
    
    throw {
      status: response.status,
      message: errPayload?.message || "HTTP помилка",
      details: errPayload?.details || rawText || `Помилка ${response.status}`
    };
  }

 
  if (!rawText) return null;
  try { return JSON.parse(rawText); } catch { return rawText; }
}


export async function getSoftwareList() {
  return await request("/software", { method: "GET" });
}

export async function createSoftware(data) {
  return await request("/software", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}