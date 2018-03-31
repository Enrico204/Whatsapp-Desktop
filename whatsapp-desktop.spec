
%define        __spec_install_post %{nil}
%define          debug_package %{nil}
%define        __os_install_post %{_dbpath}/brp-compress

Summary:   WhatsApp Desktop
Name:      WhatsApp
Version:   0.5.0
Release:   1
License:   GPL
Group:     None
Packager:  Enrico204 <enrico204@gmail.com>
BuildArchitectures: x86_64
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
Source:    dummy.tar.bz2
Requires:  libXScrnSaver
Provides:  libffmpeg.so()(64bit)

%description
Unofficial WhatsApp desktop client, based on the official WhatsApp web app. Build with Electron.

%prep
%setup -c -q -T -D -a 0

%build
# Empty section.

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}
mkdir -p %{buildroot}/usr/share/applications/
mkdir -p %{buildroot}/usr/share/metainfo/
mkdir -p %{buildroot}/usr/share/icons/hicolor/128x128/apps/
mkdir -p %{buildroot}/usr/share/icons/hicolor/64x64/apps/
cp "%{_topdir}/../app/assets/icon/icon@2x.png" %{buildroot}/usr/share/icons/hicolor/128x128/apps/whatsapp.png
cp "%{_topdir}/../app/assets/icon/icon.png" %{buildroot}/usr/share/icons/hicolor/64x64/apps/whatsapp.png
cp %{_topdir}/../whatsappdesktop.desktop %{buildroot}/usr/share/applications/
cp %{_topdir}/../it.enrico204.whatsapp-desktop.appdata.xml %{buildroot}/usr/share/metainfo/
# copy files in builddir
install -d -m 0755 %{buildroot}/opt/whatsapp-desktop/
install -d -m 0755 %{buildroot}/%{_bindir}
cp -ar %{_topdir}/../dist/WhatsApp-linux-x64/* %{buildroot}/opt/whatsapp-desktop/
ln -sf /opt/whatsapp-desktop/WhatsApp %{buildroot}/%{_bindir}/WhatsApp

%clean
rm -rf %{buildroot}


%files
%defattr(-,root,root,-)
/opt/whatsapp-desktop/*
%{_bindir}/WhatsApp
/usr/share/applications/whatsappdesktop.desktop
/usr/share/metainfo/it.enrico204.whatsapp-desktop.appdata.xml
/usr/share/icons/hicolor/128x128/apps/whatsapp.png
/usr/share/icons/hicolor/64x64/apps/whatsapp.png

%changelog
* Sat Mar 31 2018  Enrico204 <enrico204@gmail.com> 0.5.0-1
- See debian changelog in repo

* Wed Jan 03 2018  Enrico204 <enrico204@gmail.com> 0.4.2-1
- See debian changelog on repo

* Tue Jan 02 2018  Enrico204 <enrico204@gmail.com> 0.4.1-1
- See debian changelog on repo

* Sun Dec 31 2017  Enrico204 <enrico204@gmail.com> 0.4.0-1
- See debian changelog on repo

* Sat Nov 04 2017  Enrico204 <enrico204@gmail.com> 0.3.14-1
- See debian changelog on repo

* Mon Aug 28 2017  Enrico204 <enrico204@gmail.com> 0.3.13-1
- See debian changelog on repo

* Thu Aug  3 2017  Enrico204 <enrico204@gmail.com> 0.3.12-1
- First Build
