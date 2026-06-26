import { onRequestGet as __api_media___path___js_onRequestGet } from "E:\\tukang-web\\functions\\api\\media\\[[path]].js"
import { onRequestPost as __api_auth_js_onRequestPost } from "E:\\tukang-web\\functions\\api\\auth.js"
import { onRequestGet as __api_content_js_onRequestGet } from "E:\\tukang-web\\functions\\api\\content.js"
import { onRequestPost as __api_content_js_onRequestPost } from "E:\\tukang-web\\functions\\api\\content.js"
import { onRequestDelete as __api_members_js_onRequestDelete } from "E:\\tukang-web\\functions\\api\\members.js"
import { onRequestGet as __api_members_js_onRequestGet } from "E:\\tukang-web\\functions\\api\\members.js"
import { onRequestPost as __api_members_js_onRequestPost } from "E:\\tukang-web\\functions\\api\\members.js"
import { onRequestPut as __api_members_js_onRequestPut } from "E:\\tukang-web\\functions\\api\\members.js"
import { onRequestPost as __api_upload_js_onRequestPost } from "E:\\tukang-web\\functions\\api\\upload.js"

export const routes = [
    {
      routePath: "/api/media/:path*",
      mountPath: "/api/media",
      method: "GET",
      middlewares: [],
      modules: [__api_media___path___js_onRequestGet],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_js_onRequestPost],
    },
  {
      routePath: "/api/content",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_content_js_onRequestGet],
    },
  {
      routePath: "/api/content",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_content_js_onRequestPost],
    },
  {
      routePath: "/api/members",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_members_js_onRequestDelete],
    },
  {
      routePath: "/api/members",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_members_js_onRequestGet],
    },
  {
      routePath: "/api/members",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_members_js_onRequestPost],
    },
  {
      routePath: "/api/members",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_members_js_onRequestPut],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_js_onRequestPost],
    },
  ]