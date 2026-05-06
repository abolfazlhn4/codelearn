import React from "react";
import { Award } from "lucide-react";

const CertificatesTab = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300 px-4 text-center">
    <Award className="w-20 h-20 text-gray-300 mb-6" />
    <h3 className="text-xl font-bold text-gray-800 mb-4">
      در حال حاضر گواهی‌نامه‌ای صادر نشده است.
    </h3>
    <p className="text-gray-500 max-w-md leading-relaxed text-sm">
      شما می‌توانید با اشتراک‌گذاری گواهی‌نامه‌های خود در رزومه و شبکه‌های
      اجتماعی از فرصت‌های رشد و پیشرفت بیشتری برخوردار شوید.
    </p>
  </div>
);

export default CertificatesTab;
