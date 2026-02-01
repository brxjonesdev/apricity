"use client";

import { useProject } from "@/lib/contexts/projectsContext";

export default function SettingsMenu() {
  const { project } = useProject();
  return (
    <div className="w-64 border-l p-4">
      <h2 className="text-xl font-semibold mb-4">Settings Menu</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            General Settings for {project.name}
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            User Management
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Billing Information
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Integrations
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Security Settings
          </a>
        </li>
      </ul>
    </div>
  );
}
