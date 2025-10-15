import { Rocket, Phone, RotateCcw, Gift } from "lucide-react";
import { serviceGuarantees } from "@/constants/Hero";

const iconMap = {
  Rocket,
  Phone,
  RotateCcw,
  Gift,
};

export default function ServiceGuarantees() {
  return (
    <div className="max-w-7xl mx-auto pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-12 ">
        {serviceGuarantees.map((service, index) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap];
          return (
            <div key={index} className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg flex items-center ">
                <IconComponent className="h-9 w-9 text-black " />
              </div>

              <div>
                <h3 className="text-sm font-ligth font-rubik  text-black ">
                  {service.title}
                </h3>
                <p className="text-xs text-muted font-rubik">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
