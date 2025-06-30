import { NextResponse } from 'next/server';
import { handleOAuthCallback } from '../../../services/melhorEnvioAuth';

// Garantir que este handler seja executado apenas no servidor
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extrair o código de autorização da URL
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Código de autorização não fornecido' },
        { status: 400 }
      );
    }
    
    // Processar o código e obter token
    const tokenData = await handleOAuthCallback(code);
    
    // Redirecionar para uma página de sucesso com os detalhes do token
    // Em produção, você provavelmente só redirecionaria de volta para a página principal
    return NextResponse.redirect(new URL('/melhor-envio-success?authorized=true', request.url));
  } catch (error: any) {
    console.error('Erro no callback OAuth do Melhor Envio:', error);
    
    // Redirecionar para uma página de erro
    return NextResponse.redirect(
      new URL(`/melhor-envio-error?error=${encodeURIComponent(error.message || 'Erro desconhecido')}`, request.url)
    );
  }
} 