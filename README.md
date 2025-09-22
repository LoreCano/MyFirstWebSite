# Posterly - Poster Showcase Website

Un sito web moderno per la vendita di poster musicali con tema scuro e design professionale.

## Funzionalità

- 🎨 **Design moderno**: Tema scuro con animazioni fluide
- 📱 **Responsive**: Layout adattivo per tutti i dispositivi
- 🖼️ **Griglia poster**: Visualizzazione elegante con effetti hover
- 📧 **Form contatti**: Sistema di richieste con invio email
- 🔒 **Sicurezza**: Protezione anti-spam e validazione dati
- ⚡ **Performance**: Lazy loading e ottimizzazioni

## Setup del progetto

### 1. Installazione dipendenze
```bash
npm install
```

### 2. Configurazione Supabase

Per far funzionare l'invio delle email, devi configurare Supabase:

1. Vai su [supabase.com](https://supabase.com) e crea un nuovo progetto
2. Copia l'URL del progetto e la chiave anonima
3. Crea un file `.env` nella root del progetto:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Avvio del server di sviluppo
```bash
npm run dev
```

## Configurazione Email

Il sistema attualmente simula l'invio delle email. Per abilitare l'invio reale:

1. **Opzione 1 - Resend (Consigliato)**:
   - Registrati su [resend.com](https://resend.com)
   - Ottieni la tua API key
   - Modifica `supabase/functions/send-email/index.ts`

2. **Opzione 2 - SendGrid**:
   - Registrati su [sendgrid.com](https://sendgrid.com)
   - Configura l'API key
   - Integra nel codice della funzione

3. **Opzione 3 - Servizio SMTP**:
   - Usa Gmail, Outlook o altro provider
   - Configura le credenziali SMTP

## Struttura del progetto

```
src/
├── components/          # Componenti React
│   ├── Header.tsx      # Header con navigazione
│   ├── PosterGrid.tsx  # Griglia dei poster
│   ├── PosterCard.tsx  # Card singolo poster
│   ├── PosterModal.tsx # Modal dettaglio poster
│   ├── ContactForm.tsx # Form di contatto
│   └── Footer.tsx      # Footer del sito
├── context/            # Context per stato globale
│   └── PosterContext.tsx
├── App.tsx            # Componente principale
└── main.tsx          # Entry point

supabase/
└── functions/
    └── send-email/    # Edge function per invio email
        └── index.ts
```

## Personalizzazione

### Aggiungere nuovi poster

Modifica l'array `posters` in `src/components/PosterGrid.tsx`:

```typescript
{
  id: 9,
  title: 'Nome Album',
  artist: 'Nome Artista',
  price: 'Da €20,50',
  image: '/images/posters/nome-file.jpg',
  description: 'Descrizione del poster...'
}
```

### Modificare i colori

I colori principali sono definiti in `src/index.css`:
- Background: `#0f0f0f`
- Cards: `#151515`
- Accent: `#00C853`

### Aggiungere immagini

Carica le tue immagini in `public/images/posters/` e aggiorna i percorsi nel codice.

## Deploy

Il sito può essere deployato su:
- **Vercel** (Consigliato)
- **Netlify**
- **GitHub Pages**

Assicurati di configurare le variabili d'ambiente nel servizio di hosting.

## Supporto

Per domande o problemi, contatta: posterly97@gmail.com