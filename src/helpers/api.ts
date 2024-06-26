import * as m from "mithril";
export async function processLogin(e: Event) {
  e.preventDefault();
  const result = await m.request({
    method: "POST",
    url: (await fetch(window.location.origin+'/env.json').then(response => {
      return response.json()
    }).then((data) => {return data.api_url})) + "/api/login",
    withCredentials: true,
    config: (xhr_1) => {
      xhr_1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    },
    body: {
      username: e.target[0].value,
      password: e.target[1].value,
    },
    extract: function (xhr_3) {
      return { status: xhr_3.status, body: xhr_3.responseText };
    },
  });
  if (result.body == "logged_in") {
    m.route.set("/");
  }
}

export default async function checkLogin() {
  const result = await m.request({
    method: "GET",
    url: await fetch(window.location.origin+'/env.json').then(response => {
      return response.json()
    }).then((data) => {return data.api_url}) + "/api/checklogin",
    withCredentials: true,
    extract: function (xhr_1) {
      return { status: xhr_1.status, body: xhr_1.responseText };
    },
  });
  return result.body == "logged_in";

}
