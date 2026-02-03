import { motion } from 'framer-motion';
import { type TeamMember } from '../../services/team';
import TeamMemberCard from './TeamMemberCard';

interface TeamSectionProps {
    title: string;
    members: TeamMember[];
    className?: string;
    startIndex?: number;
}

const TeamSection = ({ title, members, className = "", startIndex = 0 }: TeamSectionProps) => {
    if (members.length === 0) return null;

    return (
        <div className={`mb-20 ${className}`}>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-kalrav text-center text-white mb-8 md:mb-12 tracking-widest drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            >
                {title.toUpperCase()}
            </motion.h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full max-w-7xl mx-auto px-2 md:px-4">
                {members.map((member, i) => (
                    <div key={member.id} className="w-[47%] sm:w-[45%] md:w-[30%] lg:w-[22%] flex justify-center">
                        <div className="w-full font-kalrav-body max-w-sm">
                            <TeamMemberCard member={member} index={startIndex + i} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
