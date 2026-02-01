import { useSearchParams } from "react-router-dom";
import { yt_html } from "../assets/assets";

const YtPreview = () => {
  const [searchParams] = useSearchParams();

  const thumbnail_url = searchParams.get("thumbnail_url");
  const title = searchParams.get("title");

  if (!thumbnail_url || !title) {
    return <div className="text-white">Invalid preview data</div>;
  }

  const new_html = yt_html
    .replace("%%THUMBNAIL_URL%%", thumbnail_url)
    .replace("%%TITLE%%", title);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <iframe srcDoc={new_html} className="w-full h-full" allowFullScreen />
    </div>
  );
};

export default YtPreview;
