'use client';

import Heading from "@/components/Heading";
import AvatarProfile from '@/components/profile-avatar';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import useModal from '@/hooks/use-modal';
import { Edit2 } from 'lucide-react';
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
    const {user} = useUser();
    const {onOpen} = useModal();

    return (
        <section className='flex flex-col gap-4'>
            <Heading 
                title="My Profile"
                subtitle="Info about your account"
            />
            <Separator />
            <div className="flex items-center gap-4">
                <div className="relative flex justify-end">
                    <Button
                        className="absolute top-0 right-0 rounded-full z-[20]"
                        variant={"outline"}
                        size={"icon"}
                    >
                        <Edit2
                            onClick={() => onOpen("editProfile", { imageSrc: user?.imageSrc })}
                            size={15}
                        />
                    </Button>
                    <AvatarProfile 
                        className='w-20 h-20'
                        src={user?.imageSrc} 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label className={'font-bold'}>{user?.fullName}</Label>
                    <Label className={'text-xs'}>@{user?.username}</Label>
                </div>
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
                        value={user?.number!}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Address</Label>
                    <Input
                        disabled
                        value={user?.address!}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>City</Label>
                    <Input
                        disabled
                        value={user?.city!}
                    />
                </div>
            </div>
        </section>
    )
}
export default ProfilePage;