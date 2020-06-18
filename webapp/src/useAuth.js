export default function useAuth() {
  return JSON.parse(window.sessionStorage.getItem('auth'));
}
