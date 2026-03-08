export interface Action {
  id: string;
  text: string;
  emoji: string;
  shareText: string;
}

export const actionsByLevel: Record<string, Action[]> = {
  "5min": [
    { id: "star-repo", text: "Star 3 open-source repos created by women developers on GitHub", emoji: "⭐", shareText: "I just committed 5 minutes to star open-source repos by women developers." },
    { id: "linkedin-endorse", text: "Endorse 5 skills on a woman colleague's LinkedIn profile", emoji: "💪", shareText: "I just spent 5 minutes endorsing the skills of incredible women in my network." },
    { id: "share-article", text: "Share an article by a woman thought leader with your network", emoji: "📢", shareText: "I just committed 5 minutes to amplifying a woman thought leader's voice." },
    { id: "thank-mentor", text: "Send a thank-you message to a woman who has mentored or inspired you", emoji: "💌", shareText: "I just took 5 minutes to thank a woman who has inspired my journey." },
  ],
  "15min": [
    { id: "nominate-speaker", text: "Nominate a woman to speak at an upcoming event or conference", emoji: "🎤", shareText: "I just nominated a brilliant woman to speak at an upcoming event." },
    { id: "make-intro", text: "Make a warm introduction between two women who should know each other", emoji: "🤝", shareText: "I just made a powerful introduction connecting two incredible women." },
    { id: "write-rec", text: "Write a LinkedIn recommendation for a woman you've worked with", emoji: "✍️", shareText: "I just wrote a recommendation for an amazing woman I've had the privilege to work with." },
    { id: "amplify-work", text: "Comment thoughtfully on 5 posts by women in your industry", emoji: "💬", shareText: "I just spent 15 minutes amplifying the voices of women in my industry." },
  ],
  "1hour": [
    { id: "review-resume", text: "Review and give feedback on a woman's resume or portfolio", emoji: "📋", shareText: "I just spent an hour reviewing a resume to help a woman advance her career." },
    { id: "mentor-session", text: "Offer a free 1-hour mentoring session to a woman starting in your field", emoji: "🌱", shareText: "I just committed 1 hour of mentoring to support a woman entering my field." },
    { id: "code-review", text: "Do a code review or portfolio critique for a woman breaking into tech", emoji: "💻", shareText: "I just spent an hour doing a code review to support a woman breaking into tech." },
    { id: "workshop", text: "Host a mini skill-share workshop for women in your community", emoji: "🎓", shareText: "I just hosted a skill-share session for women in my community." },
  ],
  "$25": [
    { id: "donate-scholarship", text: "Donate $25 to a scholarship fund for women in STEM", emoji: "🎓", shareText: "I just donated $25 to a scholarship fund for women in STEM." },
    { id: "buy-book", text: "Buy a book by a woman author and gift it to someone", emoji: "📚", shareText: "I just bought a book by a woman author and gifted it forward." },
    { id: "support-business", text: "Purchase from a woman-owned small business today", emoji: "🛍️", shareText: "I just supported a woman-owned business with a $25 purchase." },
    { id: "fund-course", text: "Sponsor a woman's access to an online course or workshop", emoji: "💡", shareText: "I just sponsored a woman's access to an online learning opportunity." },
  ],
};

export const levelLabels: Record<string, { label: string; description: string; icon: string }> = {
  "5min": { label: "5 Minutes", description: "A small act, a big ripple", icon: "⚡" },
  "15min": { label: "15 Minutes", description: "Build a bridge today", icon: "🌉" },
  "1hour": { label: "1 Hour", description: "Deep investment in change", icon: "🔥" },
  "$25": { label: "$25", description: "Fund the future", icon: "💜" },
};
