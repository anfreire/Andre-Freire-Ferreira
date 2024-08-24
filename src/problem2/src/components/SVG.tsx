import React, { useEffect, useState } from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  path: string;
}

const fetchSvg = async (path: string) => {
  try {
    const response = await fetch(path);
    return await response.text();
  } finally {
    return null;
  }
};

const SVG: React.FC<SVGProps> = ({ path, ...props }) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetchSvg(path).then((content) => content && setSvgContent(content));
  }, [path]);

  return svgContent ? (
    <svg {...props} dangerouslySetInnerHTML={{ __html: svgContent }} />
  ) : null;
};

export default SVG;
