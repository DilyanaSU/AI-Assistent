var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4", // Updated model name for ChatGPT-4
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        temperature: 0.5,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

const url = "https://api.openai.com/v1/completions"; // Updated endpoint URL

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    post(apiKey, endpoint, prompt) {
      return ajaxCall(apiKey, `${url}`, prompt)
        .then(({ response }) => {
          console.log(response.choices[0].text);
          return response.choices[0].text;
        })
        .catch(error => {
          console.error("Fehler bei der API-Anfrage:", error);
          throw error;
        });
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
