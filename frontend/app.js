const API = "https://neonaudit-backend.vercel.app/api/audit"; 
// این آدرس بعداً با URL واقعی بک‌اند عوض میشه

document.getElementById("scanBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  if (!url) {
    alert("لطفاً URL را وارد کن");
    return;
  }

  loading.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    loading.classList.add("hidden");
    result.classList.remove("hidden");

    result.innerHTML = `
      <h2>نتایج اسکن</h2>
      <p><strong>URL:</strong> ${data.url}</p>
      <p><strong>Performance Score:</strong> ${data.performance}</p>
      <p><strong>LCP:</strong> ${data.lcp}</p>
      <p><strong>CLS:</strong> ${data.cls}</p>
      <p><strong>INP:</strong> ${data.inp}</p>
    `;
  } 
  catch (err) {
    loading.classList.add("hidden");
    alert("خطا در اتصال به سرور!");
  }
});
