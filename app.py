import streamlit as st
from moviepy.editor import *
from PIL import Image
from io import BytesIO
from elevenlabs.client import ElevenLabs
from gtts import gTTS
import requests
import textwrap
import os

# =====================================================
# API KEY
# =====================================================

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY", "")
if not ELEVEN_API_KEY or ELEVEN_API_KEY == "YOUR_ELEVENLABS_API_KEY":
    if os.path.exists(".env"):
        with open(".env", "r") as env_f:
            for line in env_f:
                if line.startswith("ELEVENLABS_API_KEY="):
                    ELEVEN_API_KEY = line.strip().split("=", 1)[1]

client = None
if ELEVEN_API_KEY and ELEVEN_API_KEY != "YOUR_ELEVENLABS_API_KEY":
    try:
        client = ElevenLabs(api_key=ELEVEN_API_KEY)
    except:
        client = None

# =====================================================
# PAGE CONFIG
# =====================================================

st.set_page_config(
    page_title="AI Cinematic Studio",
    page_icon="🎬",
    layout="wide"
)

# =====================================================
# TITLE
# =====================================================

st.title("🎬 VIDONOVA AI CINEMATIC STUDIO")
st.markdown("Next-Level Automated Script-to-Video AI Studio")

# =====================================================
# UI
# =====================================================

col1, col2, col3 = st.columns(3)

with col1:
    video_mode = st.selectbox(
        "Video Mode",
        [
            "Cinematic Landscape",
            "YouTube Shorts / Reels"
        ]
    )

with col2:
    voice_type = st.selectbox(
        "Voice Engine",
        [
            "ElevenLabs AI",
            "Google TTS Backup"
        ]
    )

with col3:
    target_duration_label = st.selectbox(
        "Target Video Duration (Time Limit)",
        [
            "30 Seconds (Quick Reel)",
            "1 Minute (Shorts)",
            "2 Minutes (Story)",
            "3 Minutes (Standard)",
            "5 Minutes (Feature)"
        ],
        index=3
    )

DURATION_MAP = {
    "30 Seconds (Quick Reel)": 30,
    "1 Minute (Shorts)": 60,
    "2 Minutes (Story)": 120,
    "3 Minutes (Standard)": 180,
    "5 Minutes (Feature)": 300
}
TARGET_SECONDS = DURATION_MAP.get(target_duration_label, 180)

story = st.text_area(
    "Enter Story / Script (Hindi, English, or Hinglish)",
    height=150,
    placeholder="Type or paste any story here... e.g. 'एक जंगल में एक हाथी और चूहा रहते थे। दोनों में बहुत पक्की दोस्ती थी...'"
)

# =====================================================
# CREATE FOLDERS
# =====================================================

os.makedirs("temp", exist_ok=True)
os.makedirs("output", exist_ok=True)
os.makedirs("music", exist_ok=True)

# =====================================================
# VIDEO SIZE
# =====================================================

if video_mode == "YouTube Shorts / Reels":
    VIDEO_SIZE = (1080, 1920)
else:
    VIDEO_SIZE = (1280, 720)

# =====================================================
# VIDONOVA AI SCRIPT & SCENE BREAKDOWN (TIME LIMIT AWARE)
# =====================================================

def split_story_and_generate_scenes(text, target_seconds):
    """
    Intelligently breaks any script/story into scenes with character dialogues
    and allocates durations proportional to target_seconds.
    """
    lines = [l.strip() for l in text.split("\n") if l.strip() and not l.startswith("//")]
    
    # Check if text already has speaker tags
    dialogues = []
    for l in lines:
        if ":" in l:
            dialogues.append(l)

    if len(dialogues) < 3:
        # Prose/narrative story: split by sentences and build dialogue scenes
        import re
        sentences = [s.strip() for s in re.split(r'[.?!।\n]+', text) if len(s.strip()) > 5]
        target_scene_count = max(4, round(target_seconds / 6.0))
        
        # Check language
        is_hindi = bool(re.search(r'[\u0900-\u097F]', text))
        
        char1 = "Character A"
        char2 = "Character B"
        if is_hindi:
            char1 = "शेर" if "शेर" in text else "हाथी"
            char2 = "चूहा"
        elif "dragon" in text.lower() or "knight" in text.lower():
            char1 = "Knight"
            char2 = "Dragon"
        else:
            char1 = "Hero"
            char2 = "Companion"

        scenes = []
        for i in range(target_scene_count):
            speaker = char1 if (i % 2 == 0) else char2
            if i < len(sentences):
                content = sentences[i]
                scenes.append(f"[{speaker}]: {content}")
            else:
                if is_hindi:
                    fillers = [
                        "ज़रा आगे देखो, रास्ता कितना रोमांचक लग रहा है!",
                        "बिल्कुल सच कहा! हम दोनों मिलकर हर मुश्किल हल कर सकते हैं!",
                        "सावधान रहो मेरे दोस्त, मंज़िल बिल्कुल करीब है!",
                        "हाहाहा! आज की यह जीत हमारे लिए सबसे यादगार रहेगी!"
                    ]
                else:
                    fillers = [
                        "Look ahead, the adventure continues across the horizon!",
                        "Together, nothing can stand in our path!",
                        "Stay sharp, our greatest challenge is right in front of us!",
                        "We did it! This is a moment we will remember forever!"
                    ]
                content = fillers[i % len(fillers)]
                scenes.append(f"[{speaker}]: {content}")
    else:
        scenes = dialogues

    # Calculate proportional durations to hit target_seconds
    raw_durations = [max(4.0, len(s.split()) / 2.2 + 2.0) for s in scenes]
    total_raw = sum(raw_durations) if raw_durations else 1
    scale = target_seconds / total_raw

    timed_scenes = []
    for s, d in zip(scenes, raw_durations):
        timed_scenes.append({
            "text": s,
            "duration": max(3.0, round(d * scale, 2))
        })
    return timed_scenes

# =====================================================
# IMAGE FETCH (STORYBOOK ILLUSTRATION STYLE)
# =====================================================

def fetch_image(scene_text, index):
    try:
        import re
        from urllib.parse import quote

        clean_text = re.sub(r'\[.*?\]:?', '', scene_text).strip()
        text_lower = clean_text.lower()

        # Context-aware fairytale storybook actions
        action = "walking happily together along a sunlit dirt path through ancient mossy canopy trees with glowing fireflies"
        if any(w in text_lower for w in ["जाल", "शिकारी", "फंदा", "trap", "net"]):
            action = "brave cute tiny mouse chewing through hunter rope net while friendly baby elephant looks on grateful"
        elif any(w in text_lower for w in ["झरना", "पानी", "waterfall", "river", "creek"]):
            action = "resting happily together beside a sparkling crystal forest creek with colorful pebbles and glowing lanterns"
        elif any(w in text_lower for w in ["पत्थर", "पेड़", "ताक़त", "branch", "path"]):
            action = "cute baby elephant using trunk to lift a mossy tree branch from trail while tiny mouse cheers joyfully"
        elif any(w in text_lower for w in ["दोस्त", "एकता", "दोस्ती", "friend", "sunset", "साथ"]):
            action = "celebrating friendship together with tiny mouse sitting happily on baby elephant trunk under warm golden sunset"

        prompt = f"whimsical children's picture book illustration of cute cartoon baby elephant with big smiling eyes and tiny cute mouse in an enchanted fairytale forest, {action}, ancient mossy canopy trees, glowing fireflies, colorful wildflowers, soft warm golden sunlight, soft watercolor and gouache texture, vibrant storybook fantasy art, masterpiece"
        url = f"https://image.pollinations.ai/prompt/{quote(prompt)}?width={VIDEO_SIZE[0]}&height={VIDEO_SIZE[1]}&nologo=true&seed={index * 137 + 42}"

        try:
            response = requests.get(url, timeout=12)
            if response.status_code == 200 and len(response.content) > 5000:
                if not response.content.startswith(b'{"status"'):
                    path = f"temp/scene_{index}.jpg"
                    with open(path, "wb") as f:
                        f.write(response.content)
                    return path
        except:
            pass

        # High-res curated storybook local asset fallback (100% aesthetic match)
        local_asset = f"assets/images/storybook_scene_{(index % 4) + 1}.jpg"
        if os.path.exists(local_asset):
            return local_asset

        return None

    except Exception as e:
        st.error(f"Image Error: {e}")
        return None

# =====================================================
# MULTI-CHARACTER DISTINCT VOICE SYNTHESIS
# =====================================================

VOICE_MAP = {
    "narrator": "21m00Tcm4TlvDq8ikWAM",  # Rachel (Warm Storyteller)
    "elephant": "pNInz6obpgDQGcFmaJgB",  # Adam (Deep, Baritone Elephant)
    "mouse": "TxGEqnHWrfWFTfGW9XjX"     # Josh (Youthful, High Mouse)
}

def create_scene_voice(scene_text, index):
    """
    Generates distinct character voice for each scene:
    Elephant = Deep, gentle baritone voice
    Mouse = Cute, high-pitched youthful voice
    Narrator = Warm, articulate storytelling voice
    """
    import re
    save_path = f"temp/scene_{index}_voice.mp3"

    # Detect speaker from [Speaker]: Dialogue
    speaker_match = re.search(r'\[(.*?)\]', scene_text)
    speaker = speaker_match.group(1).lower() if speaker_match else "narrator"
    clean_text = re.sub(r'\[.*?\]:?', '', scene_text).strip()
    if not clean_text:
        clean_text = scene_text

    is_narrator = any(w in speaker for w in ["narrator", "सूत्रधार", "कथावाचक"])
    is_elephant = not is_narrator and any(w in speaker for w in ["हाथी", "elephant", "जंबो", "गजराज", "char a"])
    is_mouse = not is_narrator and not is_elephant and any(w in speaker for w in ["चूहा", "mouse", "rat", "चूहे", "char b"])

    if is_elephant:
        voice_id = VOICE_MAP["elephant"]
    elif is_mouse:
        voice_id = VOICE_MAP["mouse"]
    else:
        voice_id = VOICE_MAP["narrator"]

    # 1. Try ElevenLabs Multi-Voice
    if voice_type == "ElevenLabs AI" and client is not None:
        try:
            audio = client.text_to_speech.convert(
                voice_id=voice_id,
                output_format="mp3_44100_128",
                text=clean_text,
                model_id="eleven_multilingual_v2"
            )
            with open(save_path, "wb") as f:
                for chunk in audio:
                    f.write(chunk)
            return save_path
        except:
            pass

    # 2. Google TTS with distinct speed/pitch modulation per character
    try:
        is_hindi = bool(re.search(r'[\u0900-\u097F]', clean_text))
        lang = 'hi' if is_hindi else 'en'
        raw_path = f"temp/raw_scene_{index}.mp3"
        tts = gTTS(text=clean_text, lang=lang)
        tts.save(raw_path)

        # Modulate tempo/pitch per character
        try:
            from moviepy.audio.fx.all import speedx
            raw_clip = AudioFileClip(raw_path)
            if is_elephant:
                mod_clip = speedx(raw_clip, factor=0.85)  # Deep, slow elephant
            elif is_mouse:
                mod_clip = speedx(raw_clip, factor=1.28)  # High, cute squeaky mouse
            else:
                mod_clip = raw_clip
            mod_clip.write_audiofile(save_path, fps=44100, nbytes=2, codec='libmp3lame', verbose=False, logger=None)
            raw_clip.close()
            mod_clip.close()
            return save_path
        except:
            return raw_path
    except Exception as e:
        st.error(f"TTS Error: {e}")
        return None

# =====================================================
# CINEMATIC MOTION
# =====================================================

def cinematic_motion(clip):

    return clip.resize(
        lambda t: 1 + 0.03 * t
    )

# =====================================================
# GENERATE VIDEO
# =====================================================

if st.button("Generate AI Cinematic Video"):

    if story == "":

        st.warning("Please enter story")

        st.stop()

    with st.spinner("Creating VidoNova AI Video..."):

        scenes = split_story_and_generate_scenes(story, TARGET_SECONDS)

        st.success(f"{len(scenes)} Scenes Generated (Runtime: ~{TARGET_SECONDS}s)")

        clips = []

        # =============================================
        # CREATE SCENES WITH DISTINCT CHARACTER VOICES
        # =============================================

        for i, scene in enumerate(scenes):

            scene_text = scene["text"]
            scene_duration = scene["duration"]

            st.write(f"Generating Scene {i+1}: {scene_text}")

            image_path = fetch_image(scene_text, i)

            if image_path is None:
                continue

            # Generate distinct character voice for this specific scene dialogue
            voice_path = create_scene_voice(scene_text, i)
            if voice_path and os.path.exists(voice_path):
                try:
                    scene_audio = AudioFileClip(voice_path)
                    effective_duration = max(scene_duration, scene_audio.duration + 0.4)
                except:
                    scene_audio = None
                    effective_duration = scene_duration
            else:
                scene_audio = None
                effective_duration = scene_duration

            # =========================================
            # IMAGE CLIP
            # =========================================

            clip = (
                ImageClip(image_path)
                .set_duration(effective_duration)
                .resize(VIDEO_SIZE)
                .fadein(0.5)
                .fadeout(0.5)
            )

            # =========================================
            # MOTION
            # =========================================

            clip = cinematic_motion(clip)

            # =========================================
            # SUBTITLE
            # =========================================

            wrapped = "\n".join(
                textwrap.wrap(scene_text, width=35)
            )

            try:
                subtitle = (
                    TextClip(
                        wrapped,
                        fontsize=44,
                        color="white",
                        stroke_color="black",
                        stroke_width=2,
                        method="caption",
                        size=(VIDEO_SIZE[0]-100, None)
                    )
                    .set_position(("center", "bottom"))
                    .set_duration(effective_duration)
                )

                final_scene = CompositeVideoClip([
                    clip,
                    subtitle
                ])
            except:
                final_scene = clip

            if scene_audio is not None:
                final_scene = final_scene.set_audio(scene_audio)

            clips.append(final_scene)

        # =============================================
        # CHECK CLIPS
        # =============================================

        if len(clips) == 0:

            st.error("No scenes generated")

            st.stop()

        # =============================================
        # FINAL VIDEO
        # =============================================

        final_video = concatenate_videoclips(
            clips,
            method="compose"
        )

        # =============================================
        # BACKGROUND MUSIC MIXING
        # =============================================

        music_path = "music/bg_music.mp3"
        if not os.path.exists(music_path) and os.path.exists("background.mp3"):
            music_path = "background.mp3"

        if os.path.exists(music_path) and final_video.audio is not None:

            bg_music = (
                AudioFileClip(music_path)
                .volumex(0.12)
                .subclip(0, final_video.duration)
            )

            final_audio = CompositeAudioClip([
                final_video.audio,
                bg_music
            ])

            final_video = final_video.set_audio(final_audio)

        # =============================================
        # EXPORT
        # =============================================

        output_path = "output/final_cinematic_video.mp4"

        final_video.write_videofile(
            output_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="medium"
        )

        st.success("AI Cinematic Video Generated Successfully!")

        # =============================================
        # SHOW VIDEO
        # =============================================

        with open(output_path, "rb") as file:

            video_bytes = file.read()

            st.video(video_bytes)

            st.download_button(
                label="Download Video",
                data=video_bytes,
                file_name="VidoNova_AI_Cinematic_Video.mp4",
                mime="video/mp4"
            )