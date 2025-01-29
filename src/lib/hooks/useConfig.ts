import { ControlConfig, SectionConfig } from '../types';

export const useConfig = () => {
    const mergeMasterControlProperties = (section: SectionConfig | ControlConfig) => {
        if (!section || !section.controls) return;

        section.controls.forEach((control: ControlConfig) => {
            if (control.masterControl) {
                // Merge properties from masterControl to control
                for (let key in control.masterControl) {
                    if (key !== 'controls' && !(key in control)) {
                        control[key] = control.masterControl[key];
                    }
                }

                // Ensure nested controls from masterControl are included
                if (control.masterControl.controls && control.masterControl.controls.length > 0) {
                    if (!control.controls) {
                        control.controls = [];
                    }
                    control.masterControl.controls.forEach((nestedControl: ControlConfig) => {
                        // Check if the nested control already exists
                        const existingControlIndex = control?.controls?.findIndex((c) => c.controlKey === nestedControl.controlKey) as number;
                        if (existingControlIndex === -1) {
                            control?.controls?.push(nestedControl);
                        } else {
                            // Merge properties for existing nested control
                            mergeMasterControlProperties(control?.controls?.[existingControlIndex] as any);
                        }
                    });
                }

                // Remove masterControl property
                delete control.masterControl;
            }

            // Recursively merge properties for nested controls
            if (control.controls && control.controls.length > 0) {
                mergeMasterControlProperties(control);
            }
        });
    };

    const toPageConfig = (data: any) => {
        if (!data || !data.sections) return;

        data.sections.forEach((section: SectionConfig) => {
            mergeMasterControlProperties(section);
        });

        return data;
    };

    return { toPageConfig };
};
