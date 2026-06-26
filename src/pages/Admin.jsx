import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaChartBar, FaCogs, FaImages, FaUsers, FaSignOutAlt, FaCheckCircle, FaTrash, FaEdit, FaUndo } from 'react-icons/fa';
import './Admin.css';

const DEFAULT_TEXTS = {
  hero: { title: 'We Code<br />We Deliver', subtitle: 'We are a digital agency specializing in web development, design, and digital marketing. We help businesses grow online.' },
  about: { subtitle: 'ABOUT US', title: 'Grow Your Business With Our Creative Digital Ideas', description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', description2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  stats: { customers: '190+', projects: '250+', workers: '50+', offices: '10+' },
  services: { title: 'Our Services', description: 'We offer a wide range of digital services to help your business grow and succeed in the modern world.' },
  gallery: { title: 'Our Latest Work', description: 'Check out some of our recent projects that showcase our expertise and creativity.' },
  team: { title: 'Meet Our Experts', description: 'Our team of professionals is dedicated to delivering the best results for your business.' }
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [heroData, setHeroData] = useState(DEFAULT_TEXTS.hero);
  const [aboutData, setAboutData] = useState(DEFAULT_TEXTS.about);
  const [statsData, setStatsData] = useState(DEFAULT_TEXTS.stats);
  const [servicesData, setServicesData] = useState(DEFAULT_TEXTS.services);
  const [galleryData, setGalleryData] = useState(DEFAULT_TEXTS.gallery);
  const [teamData, setTeamData] = useState(DEFAULT_TEXTS.team);
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', role: '', image_url: '', twitter_url: '', linkedin_url: '', github_url: '' });

  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if(Array.isArray(data)) setTeamMembers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchConfig = { headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } };
        
        const [heroRes, aboutRes, statsRes, servicesRes, galleryRes, teamRes] = await Promise.all([
          fetch('/api/content?type=hero').then(res => res.json()),
          fetch('/api/content?type=about').then(res => res.json()),
          fetch('/api/content?type=stats').then(res => res.json()),
          fetch('/api/content?type=services').then(res => res.json()),
          fetch('/api/content?type=gallery').then(res => res.json()),
          fetch('/api/content?type=team').then(res => res.json())
        ]);
        
        if(heroRes && heroRes.title) setHeroData(heroRes);
        if(aboutRes && aboutRes.title) setAboutData(aboutRes);
        if(statsRes && statsRes.customers) setStatsData(statsRes);
        if(servicesRes && servicesRes.title) setServicesData(servicesRes);
        if(galleryRes && galleryRes.title) setGalleryData(galleryRes);
        if(teamRes && teamRes.title) setTeamData(teamRes);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
    fetchTeamMembers();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSave = async (type, data) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/content?type=${type}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        showToast('Berhasil disimpan!');
      } else {
        if(res.status === 401) handleLogout();
        else showToast('Gagal menyimpan.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Terjadi kesalahan jaringan.', 'error');
    }
  };

  const handleReset = (type) => {
    if(window.confirm('Yakin ingin mereset konten ini ke pengaturan awal?')) {
      switch(type) {
        case 'hero': setHeroData(DEFAULT_TEXTS.hero); break;
        case 'about': setAboutData(DEFAULT_TEXTS.about); break;
        case 'stats': setStatsData(DEFAULT_TEXTS.stats); break;
        case 'services': setServicesData(DEFAULT_TEXTS.services); break;
        case 'gallery': setGalleryData(DEFAULT_TEXTS.gallery); break;
        case 'team': setTeamData(DEFAULT_TEXTS.team); break;
        default: break;
      }
      showToast('Teks dikembalikan ke nilai default.');
    }
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const method = editingMember ? 'PUT' : 'POST';
      const body = editingMember ? { ...memberForm, id: editingMember.id } : memberForm;
      
      const res = await fetch(`/api/members`, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        showToast(`Anggota tim berhasil ${editingMember ? 'diubah' : 'ditambahkan'}`);
        setEditingMember(null);
        setMemberForm({ name: '', role: '', image_url: '', twitter_url: '', linkedin_url: '', github_url: '' });
        fetchTeamMembers();
      } else {
        if(res.status === 401) handleLogout();
        else showToast('Gagal menyimpan anggota.', 'error');
      }
    } catch (err) {
      showToast('Error jaringan.', 'error');
    }
  };

  const handleDeleteMember = async (id) => {
    if(!window.confirm('Yakin ingin menghapus anggota ini?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/members?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Anggota berhasil dihapus');
        fetchTeamMembers();
      } else {
        showToast('Gagal menghapus.', 'error');
      }
    } catch (err) {
      showToast('Error jaringan.', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      showToast('Mengunggah gambar...', 'info');
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if(res.ok && data.url) {
        setMemberForm({...memberForm, image_url: data.url});
        showToast('Gambar berhasil diunggah!');
      } else {
        if(res.status === 401) handleLogout();
        else showToast('Gagal mengunggah gambar', 'error');
      }
    } catch (err) {
      showToast('Error jaringan saat mengunggah', 'error');
    }
  };

  const editMember = (member) => {
    setEditingMember(member);
    setMemberForm(member);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'hero':
        return (
          <div className="admin-card fade-in">
            <h2><FaHome className="inline-icon"/> Hero Section</h2>
            <div className="form-group">
              <label>Headline (Gunakan &lt;br/&gt; untuk baris baru)</label>
              <input type="text" value={heroData.title} onChange={e => setHeroData({...heroData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <textarea value={heroData.subtitle} onChange={e => setHeroData({...heroData, subtitle: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-save" onClick={() => handleSave('hero', heroData)}>Save Changes</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('hero')}><FaUndo className="inline-icon"/> Reset</button>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="admin-card fade-in">
            <h2><FaInfoCircle className="inline-icon"/> About Section</h2>
            <div className="form-group">
              <label>Subtitle Kecil</label>
              <input type="text" value={aboutData.subtitle} onChange={e => setAboutData({...aboutData, subtitle: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Judul Utama</label>
              <input type="text" value={aboutData.title} onChange={e => setAboutData({...aboutData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Paragraf 1</label>
              <textarea value={aboutData.description1} onChange={e => setAboutData({...aboutData, description1: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Paragraf 2</label>
              <textarea value={aboutData.description2} onChange={e => setAboutData({...aboutData, description2: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-save" onClick={() => handleSave('about', aboutData)}>Save Changes</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('about')}><FaUndo className="inline-icon"/> Reset</button>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="admin-card fade-in">
            <h2><FaChartBar className="inline-icon"/> Statistics</h2>
            <div className="stats-grid">
              <div className="form-group">
                <label>Customers</label>
                <input type="text" value={statsData.customers} onChange={e => setStatsData({...statsData, customers: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Projects</label>
                <input type="text" value={statsData.projects} onChange={e => setStatsData({...statsData, projects: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Workers</label>
                <input type="text" value={statsData.workers} onChange={e => setStatsData({...statsData, workers: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Offices</label>
                <input type="text" value={statsData.offices} onChange={e => setStatsData({...statsData, offices: e.target.value})} />
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-save" onClick={() => handleSave('stats', statsData)}>Save Changes</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('stats')}><FaUndo className="inline-icon"/> Reset</button>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="admin-card fade-in">
            <h2><FaCogs className="inline-icon"/> Services Section</h2>
            <div className="form-group">
              <label>Judul Utama</label>
              <input type="text" value={servicesData.title} onChange={e => setServicesData({...servicesData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Deskripsi Pendek</label>
              <textarea value={servicesData.description} onChange={e => setServicesData({...servicesData, description: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-save" onClick={() => handleSave('services', servicesData)}>Save Changes</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('services')}><FaUndo className="inline-icon"/> Reset</button>
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="admin-card fade-in">
            <h2><FaImages className="inline-icon"/> Gallery Section</h2>
            <div className="form-group">
              <label>Judul Utama</label>
              <input type="text" value={galleryData.title} onChange={e => setGalleryData({...galleryData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Deskripsi Pendek</label>
              <textarea value={galleryData.description} onChange={e => setGalleryData({...galleryData, description: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-save" onClick={() => handleSave('gallery', galleryData)}>Save Changes</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('gallery')}><FaUndo className="inline-icon"/> Reset</button>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="admin-card fade-in">
            <h2><FaUsers className="inline-icon"/> Team Section</h2>
            <div className="form-group">
              <label>Judul Utama</label>
              <input type="text" value={teamData.title} onChange={e => setTeamData({...teamData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Deskripsi Pendek</label>
              <textarea value={teamData.description} onChange={e => setTeamData({...teamData, description: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '10px', marginBottom: '40px'}}>
              <button className="btn-save" onClick={() => handleSave('team', teamData)}>Save Headings</button>
              <button className="btn-save" style={{background: '#475569'}} onClick={() => handleReset('team')}><FaUndo className="inline-icon"/> Reset Headings</button>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginBottom: '40px' }} />

            <h3>Manage Team Members</h3>
            
            <div className="team-members-list" style={{ marginBottom: '30px' }}>
              {teamMembers.map(member => (
                <div key={member.id} className="team-member-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={member.image_url} alt={member.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block', color: '#fff' }}>{member.name}</strong>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{member.role}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => editMember(member)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}><FaEdit /></button>
                    <button onClick={() => handleDeleteMember(member.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}><FaTrash /></button>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && <p style={{color: '#cbd5e1'}}>No team members found.</p>}
            </div>

            <div className="add-member-form" style={{ background: 'rgba(0,0,0,0.1)', padding: '20px', borderRadius: '8px' }}>
              <h4>{editingMember ? 'Edit Member' : 'Add New Member'}</h4>
              <form onSubmit={handleSaveMember}>
                <div className="stats-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" required value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" required value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Foto Anggota (Unggah File)</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer' }} />
                  {memberForm.image_url && <p style={{marginTop: '10px', fontSize: '13px', color: '#94a3b8'}}>Preview Foto:</p>}
                  {memberForm.image_url && <img src={memberForm.image_url} alt="Preview" style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginTop: '5px', border: '2px solid rgba(255,255,255,0.2)'}}/>}
                </div>
                <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="form-group">
                    <label>Twitter Link</label>
                    <input type="text" value={memberForm.twitter_url} onChange={e => setMemberForm({...memberForm, twitter_url: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn Link</label>
                    <input type="text" value={memberForm.linkedin_url} onChange={e => setMemberForm({...memberForm, linkedin_url: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>GitHub Link</label>
                    <input type="text" value={memberForm.github_url} onChange={e => setMemberForm({...memberForm, github_url: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn-save">{editingMember ? 'Update Member' : 'Add Member'}</button>
                  {editingMember && (
                    <button type="button" onClick={() => { setEditingMember(null); setMemberForm({name:'', role:'', image_url:'', twitter_url:'', linkedin_url:'', github_url:''}); }} style={{ padding: '12px 24px', background: '#475569', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <span>Content Manager</span>
        </div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}><FaHome /> Hero</button>
          <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}><FaInfoCircle /> About</button>
          <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}><FaChartBar /> Stats</button>
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}><FaCogs /> Services</button>
          <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}><FaImages /> Gallery</button>
          <button className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}><FaUsers /> Team</button>
        </nav>
        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="btn-link">View Site</a>
          <button className="btn-logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="main-header">
          <h1>Tukang Web Control Panel</h1>
          <div className="user-badge">Admin</div>
        </header>
        
        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
        <FaCheckCircle className="toast-icon"/> {toast.message}
      </div>
    </div>
  );
};

export default Admin;
