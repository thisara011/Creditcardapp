import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  signature: string;
  onSignatureChange: (signature: string) => void;
}

export default function SignaturePad({ signature, onSignatureChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const configureContext = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const getCanvasPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Map displayed coordinates to internal canvas coordinates for accurate drawing
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Keep the displayed size responsive, but set internal pixel size for sharp + accurate drawing
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setContext(ctx);
      configureContext(ctx);

      if (signature) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = signature;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    setupCanvas();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        setupCanvas();
      });

      resizeObserver.observe(canvas);

      return () => {
        resizeObserver.disconnect();
      };
    }

    const handleResize = () => setupCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [signature]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    const { x, y } = getCanvasPoint(e, canvas);

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    if ('touches' in e) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCanvasPoint(e, canvas);

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        onSignatureChange(canvas.toDataURL());
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      onSignatureChange('');
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full border-2 border-gray-300 rounded-lg bg-white cursor-crosshair touch-none max-w-full"
      />
      <button
        type="button"
        onClick={clearSignature}
        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        title="Clear signature"
      >
        <X size={16} />
      </button>
      <p className="text-xs text-gray-500 mt-2">Sign above using your mouse or touch screen</p>
    </div>
  );
}