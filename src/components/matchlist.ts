import * as m from "mithril";
import css from "../../assets/css/components/matchlist.module.css";

const { div } = require("hyperscript-helpers")(m);


interface Attrs{
    id: number,
    objectType: string,
    matchSelect?: number /* Optional */
}

const component: m.ClosureComponent<Attrs> = () => {
  let Matches = {
    data: [],
    load: async function (id: number, objectType: string) {
      Matches.data = await m.request({
        method: "GET",
        url:
            window.location.origin + "/api/" + objectType + "/" + id + "/matches",
        withCredentials: true,
      });
    }
  }
  let Object = {
    data: [],
    load: async function (id: number, objectType: string) {
      Object.data = await m.request({
        method: "GET",
        url:
            window.location.origin + "/api/" + objectType + "/" + id,
        withCredentials: true,
      });
    }
  }
  return {
    async oninit(vnode) {
      await Matches.load(vnode.attrs.id, vnode.attrs.objectType);
      await Object.load(vnode.attrs.id, vnode.attrs.objectType);
    },
    view(vnode) {
      return div("." + css.matchList, {key: Object.data['id']+vnode.attrs.objectType}, [
        div("." + css.name, Object.data['name']),
        Matches.data.map(function (match: any) {
          return div(
              "." + css.match + (match.id == vnode.attrs.matchSelect? '.'+css.select : ''),
              {
                onclick() {
                  m.route.set(`/match/${match.id}`);
                },
              },
              match.name,
          );
        }),
      ]);

    }
  }
};

export default component;
