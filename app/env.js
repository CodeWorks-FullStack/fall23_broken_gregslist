export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'https://sandbox.codeworksacademy.com' : ''
export const useSockets = false
export const domain = ''
export const audience = ''
export const clientId = ''

// NOTE got these from BCW Sandbox
// domain: codeworksclassroom.auth0.com
// audience: https://codeworksclassroom.com
// clientId: pOXw2OGv1LsYi7LEBmDF04RLkXQvldml