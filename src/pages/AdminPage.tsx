import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Lock, Plus, Edit2, Trash2, Eye, EyeOff, Shield, Star, Award, Search, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { categories, type Provider } from '@/data/providers';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      gsap.fromTo(
        '.admin-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          await fetchProviders();
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    verifySession();
  }, []);

  const fetchProviders = async () => {
    const res = await fetch('/api/providers', { credentials: 'include' });
    if (!res.ok) throw new Error('Impossible de charger les prestataires');
    const data = await res.json();
    setProviders(data);
    return data;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        toast.error('Mot de passe incorrect');
        return;
      }

      setPassword('');
      setIsAuthenticated(true);
      await fetchProviders();
      toast.success('Connexion réussie !');
    } catch (error) {
      console.error(error);
      toast.error('Impossible de se connecter');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error(error);
    }

    setIsAuthenticated(false);
    setPassword('');
    toast.info('Déconnexion réussie');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce prestataire ?')) {
      return;
    }

    try {
      const res = await fetch(`/api/providers/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Impossible de supprimer le prestataire');
      }

      setProviders(providers.filter((p) => p.id !== id));
      toast.success('Prestataire supprimé');
    } catch (error) {
      console.error(error);
      toast.error('Échec de la suppression');
    }
  };

  const handleEdit = (provider: Provider) => {
    setEditingProvider({ ...provider });
    setIsCreating(false);
    setIsEditDialogOpen(true);
  };

  const handleCreate = () => {
    const newProvider: Provider = {
      id: Date.now().toString(),
      name: '',
      job: '',
      location: '',
      description: '',
      fullDescription: '',
      services: [],
      phone: '+33',
      image: '/images/directory_plumber.jpg',
      isCertified: false,
      isFeatured: false,
      isPopular: false,
      responseTime: '1h',
      rating: 5,
      reviewCount: 0,
      reviews: [],
      category: categories[1],
      availability: 'Lun-Ven 9h-18h',
      priceRange: 'Sur devis',
      isPublished: true,
    };
    setEditingProvider(newProvider);
    setIsCreating(true);
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingProvider) return;

    if (!editingProvider.name || !editingProvider.job || !editingProvider.phone) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }

    try {
      const url = isCreating
        ? '/api/providers'
        : `/api/providers/${editingProvider.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editingProvider),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const savedProvider = await res.json();

      if (isCreating) {
        setProviders([...providers, savedProvider]);
        toast.success('Prestataire créé avec succès');
      } else {
        setProviders(
          providers.map((p) => (p.id === savedProvider.id ? savedProvider : p))
        );
        toast.success('Prestataire mis à jour');
      }

      setIsEditDialogOpen(false);
      setEditingProvider(null);
    } catch (error) {
      console.error(error);
      toast.error('Échec de l’enregistrement');
    }
  };

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Chargement de l'espace admin...</div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4B6BFB] rounded-full flex items-center justify-center border-[3px] border-black mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-[#111111]">
                Espace Administrateur
              </h1>
              <p className="text-[#2A2A2A] mt-2">
                Connectez-vous pour gérer les prestataires
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <Label htmlFor="password" className="text-[#111111] font-medium mb-2 block">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full py-3 rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Se connecter
              </Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto admin-content">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-white uppercase mb-2">
              Gestion des Prestataires
            </h1>
            <p className="text-white/70">
              {providers.length} prestataires enregistrés
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              onClick={handleCreate}
              className="bg-[#FFD166] hover:bg-[#e5bc5c] text-[#111111] font-bold px-4 py-2 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#111111]"
            >
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border-[3px] border-black p-4 shadow-[0_18px_40px_rgba(0,0,0,0.14)] mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2A2A2A]/50" />
            <Input
              type="text"
              placeholder="Rechercher un prestataire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
            />
          </div>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-black">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#111111]">
                    Prestataire
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#111111]">
                    Métier
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#111111]">
                    Localisation
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-[#111111]">
                    Statuts
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-[#111111]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr
                    key={provider.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-black mr-3"
                        />
                        <div>
                          <p className="font-bold text-[#111111]">{provider.name}</p>
                          <p className="text-xs text-[#2A2A2A]/60">
                            {provider.isPublished ? 'Publié' : 'Non publié'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#2A2A2A]">{provider.job}</td>
                    <td className="px-4 py-4 text-[#2A2A2A]">{provider.location}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        {provider.isCertified && (
                          <span className="p-1 bg-[#4B6BFB] rounded" title="Certifié">
                            <Shield className="w-4 h-4 text-white" />
                          </span>
                        )}
                        {provider.isPopular && (
                          <span className="p-1 bg-[#FFD166] rounded" title="Populaire">
                            <Star className="w-4 h-4 text-[#111111]" />
                          </span>
                        )}
                        {provider.isFeatured && (
                          <span className="p-1 bg-[#FF6B6B] rounded" title="Mis en avant">
                            <Award className="w-4 h-4 text-white" />
                          </span>
                        )}
                        {!provider.isCertified && !provider.isPopular && !provider.isFeatured && (
                          <span className="text-[#2A2A2A]/40 text-sm">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(provider)}
                          className="p-2 bg-[#4B6BFB] text-white rounded-lg hover:bg-[#3a5aea] transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(provider.id)}
                          className="p-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#2A2A2A]/60">Aucun prestataire trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] border-[3px] border-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-['Montserrat'] text-[#111111]">
              {isCreating ? 'Nouveau prestataire' : 'Modifier le prestataire'}
            </DialogTitle>
          </DialogHeader>

          {editingProvider && (
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Nom *
                  </Label>
                  <Input
                    value={editingProvider.name}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, name: e.target.value })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Métier *
                  </Label>
                  <Input
                    value={editingProvider.job}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, job: e.target.value })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Localisation *
                  </Label>
                  <Input
                    value={editingProvider.location}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, location: e.target.value })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Téléphone WhatsApp *
                  </Label>
                  <Input
                    value={editingProvider.phone}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, phone: e.target.value })
                    }
                    placeholder="+33612345678"
                    className="rounded-xl border-2 border-black"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#111111] font-medium mb-2 block">
                  Description courte
                </Label>
                <Input
                  value={editingProvider.description}
                  onChange={(e) =>
                    setEditingProvider({ ...editingProvider, description: e.target.value })
                  }
                  className="rounded-xl border-2 border-black"
                />
              </div>

              <div>
                <Label className="text-[#111111] font-medium mb-2 block">
                  Description complète
                </Label>
                <Textarea
                  value={editingProvider.fullDescription}
                  onChange={(e) =>
                    setEditingProvider({ ...editingProvider, fullDescription: e.target.value })
                  }
                  rows={4}
                  className="rounded-xl border-2 border-black"
                />
              </div>

              <div>
                <Label className="text-[#111111] font-medium mb-2 block">
                  Services (séparés par des virgules)
                </Label>
                <Input
                  value={editingProvider.services.join(', ')}
                  onChange={(e) =>
                    setEditingProvider({
                      ...editingProvider,
                      services: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="rounded-xl border-2 border-black"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Catégorie
                  </Label>
                  <select
                    value={editingProvider.category}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, category: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-black py-2 px-3"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Temps de réponse
                  </Label>
                  <Input
                    value={editingProvider.responseTime}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, responseTime: e.target.value })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Fourchette de prix
                  </Label>
                  <Input
                    value={editingProvider.priceRange}
                    onChange={(e) =>
                      setEditingProvider({ ...editingProvider, priceRange: e.target.value })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Note moyenne
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editingProvider.rating}
                    onChange={(e) =>
                      setEditingProvider({
                        ...editingProvider,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
                <div>
                  <Label className="text-[#111111] font-medium mb-2 block">
                    Nombre d'avis
                  </Label>
                  <Input
                    type="number"
                    value={editingProvider.reviewCount}
                    onChange={(e) =>
                      setEditingProvider({
                        ...editingProvider,
                        reviewCount: parseInt(e.target.value),
                      })
                    }
                    className="rounded-xl border-2 border-black"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 py-4 border-t-2 border-gray-100">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="certified"
                    checked={editingProvider.isCertified}
                    onCheckedChange={(checked) =>
                      setEditingProvider({ ...editingProvider, isCertified: checked })
                    }
                  />
                  <Label htmlFor="certified" className="flex items-center cursor-pointer">
                    <Shield className="w-4 h-4 mr-1 text-[#4B6BFB]" />
                    Certifié
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={editingProvider.isPopular}
                    onCheckedChange={(checked) =>
                      setEditingProvider({ ...editingProvider, isPopular: checked })
                    }
                  />
                  <Label htmlFor="popular" className="flex items-center cursor-pointer">
                    <Star className="w-4 h-4 mr-1 text-[#FFD166]" />
                    Populaire
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={editingProvider.isFeatured}
                    onCheckedChange={(checked) =>
                      setEditingProvider({ ...editingProvider, isFeatured: checked })
                    }
                  />
                  <Label htmlFor="featured" className="flex items-center cursor-pointer">
                    <Award className="w-4 h-4 mr-1 text-[#FF6B6B]" />
                    Mis en avant
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={editingProvider.isPublished}
                    onCheckedChange={(checked) =>
                      setEditingProvider({ ...editingProvider, isPublished: checked })
                    }
                  />
                  <Label htmlFor="published" className="flex items-center cursor-pointer">
                    {editingProvider.isPublished ? (
                      <Eye className="w-4 h-4 mr-1 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-1 text-gray-400" />
                    )}
                    Publié
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#4B6BFB] hover:bg-[#3a5aea] text-white font-bold py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Enregistrer
                </Button>
                <Button
                  onClick={() => setIsEditDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-[3px] border-black text-[#111111] font-bold py-3 rounded-xl hover:bg-black hover:text-white transition-all"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
