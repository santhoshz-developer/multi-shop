
// src > page-component > landing > types.ts
export interface QuickAccessItemData {
  name: string;
  type: string;
  icon: string;
  id: string;
}

export interface QuickAccessItemProps {
  item: {
    name: string;
    type: string;
    icon: string;
    id: string;
  };
  isMobile: boolean;
  onClick?: (id: string) => void;
}

export interface ScannerDialogProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: string | null) => void;
  onError: (error: Error) => void;
}
