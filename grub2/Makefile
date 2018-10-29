#
# Copyright (C) 2015 OVH
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/coreos/grub.git
PKG_SOURCE_VERSION:=0863c013179c5addee289fb4037e6df39ca4e351

PKG_NAME:=grub2
PKG_VERSION:=2.02-$(PKG_SOURCE_VERSION)
PKG_RELEASE:=18

PKG_FIXUP:=autoreconf
PKG_BUILD_DEPENDS:=grub2/host

include $(INCLUDE_DIR)/host-build.mk
include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
CATEGORY:=Boot Loaders
SECTION:=boot

# TODO : Check if it can work on ARM
DEPENDS:=@TARGET_x86||TARGET_x86_64

TITLE:=Grub2 Environment editor
URL:=https://github.com/coreos/grub/tree/master
SUBMENU:=Boot Loaders
endef

CONFIGURE_ARGS += \
	--target=$(REAL_GNU_TARGET_NAME) \
	--disable-werror \
	--disable-nls \
	--disable-device-mapper \
	--disable-libzfs \
	--disable-grub-mkfont \
	--with-platform=none

define Host/Configure
	$(SED) 's,(RANLIB),(TARGET_RANLIB),' $(HOST_BUILD_DIR)/grub-core/Makefile.in
	$(Host/Configure/Default)
endef

$(eval $(call HostBuild))
$(eval $(call BuildPackage,$(PKG_NAME)))
