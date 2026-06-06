'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isApiUnavailable = error.name === 'ApiUnavailableError';

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full rounded-xl shadow-sm border border-gray-200">
        <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {isApiUnavailable ? 'Serviço indisponível' : 'Algo deu errado'}
            </h2>
            <p className="text-sm text-gray-500">
              {isApiUnavailable
                ? 'Não foi possível conectar à API. Verifique se o servidor está em execução e tente novamente.'
                : 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'}
            </p>
          </div>

          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
