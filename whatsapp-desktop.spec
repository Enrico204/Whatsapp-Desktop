
%define        __spec_install_post %{nil}
%define          debug_package %{nil}
%define        __os_install_post %{_dbpath}/brp-compress

Summary:   WhatsApp Desktop
Name:      WhatsApp
Version:   0.3.12
Release:   1
License:   GPL
Group:     None
Packager:  Enrico204 <enrico204@gmail.com>
BuildArchitectures: x86_64
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
Source:    dummy.tar.bz2

%description
Unofficial WhatsApp desktop client, based on the official WhatsApp web app. Build with Electron.

%prep
%setup -c -q -T -D -a 0

%build
# Empty section.

%install
rm -rf %{buildroot}
mkdir -p  %{buildroot}
# copy files in builddir
install -d -m 0755 %{buildroot}/opt/WhatsApp-desktop/
install -d -m 0755 %{buildroot}/%{_bindir}
cp -ar %{_topdir}/../dist/WhatsApp-linux-x64/* %{buildroot}/opt/WhatsApp-desktop/
ln -sf /opt/WhatsApp-desktop/WhatsApp %{buildroot}/%{_bindir}/WhatsApp

%clean
rm -rf %{buildroot}


%files
%defattr(-,root,root,-)
/opt/WhatsApp-desktop/*
%{_bindir}/WhatsApp

%changelog
* Thu Aug  3 2017  Enrico204 <enrico204@gmail.com> 0.3.12-1
- First Build
