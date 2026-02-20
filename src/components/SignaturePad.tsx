import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  signature: string;
  onSignatureChange: (signature: string) => void;
}

export default function SignaturePad({ signature, onSignatureChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Load existing signature if any
        if (signature) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = signature;
        }
      }
    }
  }, [signature]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

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
        className="w-full border-2 border-gray-300 rounded-lg bg-white cursor-crosshair touch-none"
        style={{ maxWidth: '100%', height: 'auto', aspectRatio: '3/1' }}
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