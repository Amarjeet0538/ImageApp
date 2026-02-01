import { ZoomIn, ZoomOut, RotateCcw, RotateCw, RefreshCw } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useImageContext } from "../../context/ImageContext";

export default function CanvasImageViewer() {
  const canvasRef = useRef(null);
  const { currentImage, getCurrentImage } = useImageContext();
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    if (!canvasRef.current || !currentImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageUrl = getCurrentImage();

    if (!imageUrl) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(offset.x, offset.y);

      ctx.rotate((rotation * Math.PI) / 180);

      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      ctx.restore();
    };

    img.src = imageUrl;
  }, [currentImage, zoom, offset, rotation, getCurrentImage]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = (e.clientX - dragStart.x) / zoom;
    const deltaY = (e.clientY - dragStart.y) / zoom;

    setOffset({
      x: offset.x + deltaX,
      y: offset.y + deltaY,
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * delta, 0.5), 5));
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleRotateLeft = () => {
    setRotation((prevRotation) => (prevRotation - 90 + 360) % 360);

  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
          radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px, 20px 20px, 20px 20px",
        backgroundPosition: "0 0, 0 0, 0 0",
      }}
    >
      <canvas
        className="absolute inset-0 w-full h-full cursor-move"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          background: "transparent",
        }}
      />

      <div className="absolute bottom-5 flex flex-row justify-center items-center gap-6 p-4 bg-[#202020] rounded-xl mx-auto left-0 right-0 w-max z-10">
        <button
          className="hover:text-gray-400 cursor-pointer text-white transition"
          onClick={handleReset}
          title="Reset view"
        >
          <RefreshCw size={20} />
        </button>

        <span className="text-gray-600">|</span>

        <button
          className="hover:text-gray-400 cursor-pointer text-white transition"
          onClick={() => setZoom((z) => Math.min(z + 0.2, 5))}
          title="Zoom in"
        >
          <ZoomIn size={20} />
        </button>

        <button
          className="hover:text-gray-400 cursor-pointer text-white transition"
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
          title="Zoom out"
        >
          <ZoomOut size={20} />
        </button>

        <button
          className="hover:text-gray-400 cursor-pointer text-white transition"
          onClick={handleRotateLeft}
          title="Rotate left"
        >
          <RotateCcw size={20} />
        </button>

        <button
          className="hover:text-gray-400 cursor-pointer text-white transition"
          onClick={handleRotateRight}
          title="Rotate right"
        >
          <RotateCw size={20} />
        </button>
      </div>

      <div className="absolute bottom-5 left-5 bg-[#202020] text-white px-4 py-2 rounded-lg text-sm z-10">
        Zoom: {(zoom * 100).toFixed(0)}%
      </div>
    </div>
  );
}