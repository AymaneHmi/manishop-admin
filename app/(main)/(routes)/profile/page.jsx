'use client';

import {getUser} from '@/actions/getUser';

import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
    const user = getUser();
    return (
        <section className='flex flex-col gap-4'>
            <Heading 
                title="My Profile"
                subtitle="Info about your account"
            />
            <Separator />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                    <Avatar 
                        size={24} 
                        imageSrc={user?.imageSrc} 
                        isEdit
                    />
                    <h2>{user?.username}</h2>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input
                            disabled
                            value={user?.email}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Phone</Label>
                        <Input
                            disabled
                            value={user?.number}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Address</Label>
                        <Input
                            disabled
                            value={user?.address}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>City</Label>
                        <Input
                            disabled
                            value={user?.city}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProfilePage;