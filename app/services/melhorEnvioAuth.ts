'use client';

import axios from 'axios';
import { MELHOR_ENVIO } from '../config/constants';

// URLs do Melhor Envio
const MELHOR_ENVIO_BASE_URL = MELHOR_ENVIO.SANDBOX 
  ? MELHOR_ENVIO.BASE_URL 
  : MELHOR_ENVIO.PRODUCTION_URL;

const TOKEN_STORAGE_KEY = 'melhor_envio_token';

interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number; // Timestamp calculado quando o token foi armazenado
}

/**
 * Verifica se um token está armazenado e se ainda é válido
 */
export function hasValidToken(): boolean {
  // No cliente, verifica o localStorage
  if (typeof window !== 'undefined') {
    const tokenData = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!tokenData) return false;
    
    try {
      const parsedToken = JSON.parse(tokenData) as TokenData;
      // Verifica se o token expira em mais de 5 minutos
      return Date.now() < parsedToken.expires_at - 5 * 60 * 1000;
    } catch (error) {
      console.error('Erro ao analisar token armazenado:', error);
      return false;
    }
  }
  
  return false;
}

/**
 * Recupera o token de acesso atual ou obtém um novo se necessário
 */
export async function getAccessToken(): Promise<string> {
  // Verificar se já temos um token válido
  if (typeof window !== 'undefined') {
    const tokenData = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (tokenData) {
      try {
        const parsedToken = JSON.parse(tokenData) as TokenData;
        
        // Se o token ainda é válido (com margem de segurança de 5 minutos)
        if (Date.now() < parsedToken.expires_at - 5 * 60 * 1000) {
          return parsedToken.access_token;
        }
        
        // Se o token expirou, mas temos um refresh token
        if (parsedToken.refresh_token) {
          try {
            const newToken = await refreshAccessToken(parsedToken.refresh_token);
            return newToken;
          } catch (refreshError) {
            console.error('Erro ao renovar token:', refreshError);
            // Se falhar o refresh, tentamos solicitar um novo token
          }
        }
      } catch (error) {
        console.error('Erro ao processar token armazenado:', error);
      }
    }
  }
  
  // Se não tivermos um token válido ou ocorrer um erro, retornamos um token de demonstração
  // Em produção, você redirecionaria para o fluxo de autorização
  return 'DEMO_TOKEN_PARA_DESENVOLVIMENTO';
}

/**
 * Inicia o fluxo de autorização OAuth2
 * Retorna a URL para redirecionamento
 */
export function initiateOAuthFlow(): string {
  // URL de redirecionamento deve ser configurada no dashboard do Melhor Envio
  const redirectUri = typeof window !== 'undefined'
    ? `${window.location.origin}/api/melhor-envio/callback`
    : MELHOR_ENVIO.DEFAULT_REDIRECT_URI;
  
  // A URL completa de autorização seria:
  return `${MELHOR_ENVIO_BASE_URL}/oauth/authorize?client_id=${MELHOR_ENVIO.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=your_state_here&scope=shipping-calculate+shipping-tag+shipping-tracking+cart-read`;
}

/**
 * Processa o código de autorização recebido no callback
 */
export async function handleOAuthCallback(code: string): Promise<TokenData> {
  try {
    // URL de redirecionamento deve corresponder ao configurado no Melhor Envio
    const redirectUri = typeof window !== 'undefined'
      ? `${window.location.origin}/api/melhor-envio/callback`
      : MELHOR_ENVIO.DEFAULT_REDIRECT_URI;
    
    const response = await axios.post(`${MELHOR_ENVIO_BASE_URL}/oauth/token`, {
      grant_type: 'authorization_code',
      client_id: MELHOR_ENVIO.CLIENT_ID,
      client_secret: MELHOR_ENVIO.CLIENT_SECRET,
      redirect_uri: redirectUri,
      code
    });
    
    const tokenData: TokenData = {
      ...response.data,
      expires_at: Date.now() + (response.data.expires_in * 1000)
    };
    
    // Armazenar token
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
    }
    
    return tokenData;
  } catch (error) {
    console.error('Erro ao trocar código por token:', error);
    throw new Error('Falha ao obter token de acesso');
  }
}

/**
 * Renova o token de acesso usando o refresh token
 */
async function refreshAccessToken(refreshToken: string): Promise<string> {
  try {
    const response = await axios.post(`${MELHOR_ENVIO_BASE_URL}/oauth/token`, {
      grant_type: 'refresh_token',
      client_id: MELHOR_ENVIO.CLIENT_ID,
      client_secret: MELHOR_ENVIO.CLIENT_SECRET,
      refresh_token: refreshToken
    });
    
    const tokenData: TokenData = {
      ...response.data,
      expires_at: Date.now() + (response.data.expires_in * 1000)
    };
    
    // Armazenar token atualizado
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
    }
    
    return tokenData.access_token;
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    throw new Error('Falha ao renovar token de acesso');
  }
}

/**
 * Limpa os tokens armazenados
 */
export function clearTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

/**
 * Gera a URL para autorização do Melhor Envio
 */
export function getAuthorizationUrl(): string {
  return initiateOAuthFlow();
} 