import { ImageResponse } from "next/og";
import { promises as fs } from "node:fs";
import path from "node:path";
import { siteImages } from "@/content/studio";
import { palette } from "@/content/theme";

export const alt = "El Conceptz interior design studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function dataUrl(publicPath: string, mime: string) {
  const file = await fs.readFile(path.join(process.cwd(), "public", publicPath));
  return `data:${mime};base64,${file.toString("base64")}`;
}

/** Social card: the logo on warm ivory beside one real photograph. Generated at build time. */
export default async function OpenGraphImage() {
  const [logo, photo] = await Promise.all([
    dataUrl("brand/el-conceptz-logo.png", "image/png"),
    dataUrl(siteImages.social.src.replace(/^\//, ""), "image/jpeg"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: palette.ivory,
      }}
    >
      <div
        style={{
          width: 560,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
        }}
      >
        <img src={logo} alt="" width={416} height={97} />
        <div
          style={{
            marginTop: 40,
            width: 72,
            height: 3,
            background: palette.brick,
          }}
        />
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <img
          src={photo}
          alt=""
          width={640}
          height={630}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    </div>,
    size
  );
}
