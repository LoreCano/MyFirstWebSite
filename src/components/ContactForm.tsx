import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { usePosterContext } from '../context/PosterContext';

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  messaggio: string;
  gdpr: boolean;
  honeypot: string;
}

const ContactForm: React.FC = () => {
  const { selectedPosters, removeSelectedPoster, clearSelectedPosters } = usePosterContext();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    cellulare: '',
    messaggio: '',
    gdpr: false,
    honeypot: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-dismiss message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nome || !formData.cognome || !formData.email || !formData.cellulare) {
      setMessage({ type: 'error', text: 'Nome, cognome, email e cellulare sono obbligatori.' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Inserisci un indirizzo email valido.' });
      return false;
    }

    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(formData.cellulare.replace(/\s+/g, ''))) {
      setMessage({ type: 'error', text: 'Il numero di cellulare deve contenere almeno 8 cifre.' });
      return false;
    }

    if (formData.messaggio && formData.messaggio.length < 10) {
      setMessage({ type: 'error', text: 'Se inserito, il messaggio deve contenere almeno 10 caratteri.' });
      return false;
    }

    if (!formData.gdpr) {
      setMessage({ type: 'error', text: 'Devi accettare i termini sulla privacy.' });
      return false;
    }

    if (formData.honeypot) {
      setMessage({ type: 'error', text: 'Rilevato comportamento sospetto.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const emailData = {
        ...formData,
        selected_posters: selectedPosters,
        timestamp: new Date().toISOString()
      };

      // Use Supabase Edge Function for email sending
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
      const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Richiesta inviata con successo! Ti contatteremo presto.' });
        clearSelectedPosters(); // Clear the selected posters
        setFormData({
          nome: '',
          cognome: '',
          email: '',
          cellulare: '',
          messaggio: '',
          gdpr: false,
          honeypot: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Errore nell\'invio');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Errore nell\'invio della richiesta. Riprova più tardi.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#0b0b0b]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Richiedi un Poster</h2>
          <p className="text-[#bdbdbd] text-lg">
            Compila il form per ricevere maggiori informazioni sui nostri poster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Poster Preview */}
          {selectedPosters.length > 0 && (
            <div className="md:col-span-1">
              <div className="bg-[#151515] rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Poster Selezionati ({selectedPosters.length}):
                </h3>
                <div className="space-y-3">
                  {selectedPosters.map((poster) => (
                    <div key={poster.id} className="flex items-center justify-between bg-[#0b0b0b] rounded-lg p-3">
                      <span className="text-[#00C853] font-medium text-sm">{poster.name}</span>
                      <button
                        onClick={() => removeSelectedPoster(poster.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Rimuovi poster"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form 
            onSubmit={handleSubmit} 
            className={selectedPosters.length > 0 ? 'md:col-span-2' : 'md:col-span-3'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-white mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#151515] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00C853] transition-colors"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-white mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#151515] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00C853] transition-colors"
                  placeholder="Il tuo cognome"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#151515] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00C853] transition-colors"
                  placeholder="la.tua.email@esempio.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="cellulare" className="block text-sm font-medium text-white mb-2">
                  Numero di cellulare *
                </label>
                <input
                  type="tel"
                  id="cellulare"
                  name="cellulare"
                  value={formData.cellulare}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#151515] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00C853] transition-colors"
                  placeholder="+39 123 456 7890"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="messaggio" className="block text-sm font-medium text-white mb-2">
                Messaggio
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-[#151515] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00C853] transition-colors resize-vertical"
                placeholder="Scrivi qui la tua richiesta (opzionale, minimo 10 caratteri se inserito)..."
              />
            </div>

            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mb-8">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="gdpr"
                  checked={formData.gdpr}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 rounded border-[#333] bg-[#151515] text-[#00C853] focus:ring-[#00C853]"
                  required
                />
                <span className="text-sm text-[#bdbdbd] leading-relaxed">
                  Acconsento al trattamento dei miei dati personali secondo l'informativa sulla privacy. 
                  I dati saranno utilizzati esclusivamente per rispondere alla tua richiesta. *
                </span>
              </label>
            </div>

            {/* Message above submit button */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                message.type === 'success' 
                  ? 'bg-green-900/30 border border-green-700 text-green-400' 
                  : 'bg-red-900/30 border border-red-700 text-red-400'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00C853] hover:bg-[#00A844] disabled:bg-[#333] disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-3 text-lg"
            >
              <Mail className="w-5 h-5" />
              <span>{loading ? 'Invio in corso...' : 'Invia Richiesta'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;