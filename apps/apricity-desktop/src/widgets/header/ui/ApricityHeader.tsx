import ThemeSelect from "@/features/switch-theme/ui/ThemeSelect";
import SearchBar from "@/features/global-search/ui/Searchbar";
import SettingsModal from "@/features/manage-settings/ui/settings-modal";
import ModeSwitch from "@/features/switch-view-mode/ui/ModeSwitch";
export default function ApricityAppHeader() {
  return (
    <section className="h-16 max-h-16 border-b flex">
      <ModeSwitch/>
      <SearchBar/>
      <ThemeSelect/>
      <SettingsModal />
    </section>
  );
}


// features/
// ├── switch-theme/
// │   └── ui/
// │       └── ThemeSelect.tsx
// ├── global-search/
// │   └── ui/
// │       └── SearchBar.tsx
// └── manage-settings/
//     └── ui/
//         └── SettingsButton.tsx
