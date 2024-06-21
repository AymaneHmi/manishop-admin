'use client';

import Heading from "@/components/Heading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
const SettingsPage = () => {
    return (
        <section className='flex flex-col gap-4'>
            <Heading 
                title="Settings"
                subtitle="change your preferences."
            />
            <Separator />
            <div className="flex flex-col gap-4">
                <div className="bg-gray-100 text-black py-2 px-4 rounded flex items-center justify-between">
                    <span className="font-bold">Dark Mode</span>
                    <div>
                        <Select 
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="system">System</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="bg-gray-100 text-black py-2 px-4 rounded flex items-center justify-between">
                    <span className="font-bold">Change password</span>

                </div>
            </div>
        </section>
    )
}
export default SettingsPage;