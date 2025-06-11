#!/bin/bash

# Check for ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg not found. Install with: brew install ffmpeg"
    exit 1
fi

# Word list (Greek:English)
words=(
    "Βιβλίο:book"
    "Γεια σας:hello"
    "Δρόμος:road"
    "Ηλιος:sun"
    "Θάλασσα:sea"
    "Λόγος:word"
    "Ξένος:foreigner"
    "Ρόδο:rose"
    "Σοφία:wisdom"
    "Υγεία:health"
    "Φίλος:friend"
    "Χαρά:joy"
    "Ψυχή:soul"
    "Ωραίος:beautiful"
    "μιάμ:yum"
    "νερό:water"
    "ιστορία:history"
    "τραπέζι:table"
    "Πόλη:city"
    "ζωή:life"
)


for entry in "${words[@]}"; do
    IFS=":" read -r greek english <<< "$entry"
    aiff_file="./${english}.aiff"
    padded_file="./${english}_padded.wav"
    mp3_file="./${english}.mp3"

    # Say with extra silence around
    say -v Melina -o "$aiff_file" "[[slnc 300]] $greek [[slnc 300]]"

    # Convert to WAV and pad with 200ms silence on both ends
    ffmpeg -y -loglevel quiet -i "$aiff_file" \
        -af "apad=pad_dur=0.2,areverse,apad=pad_dur=0.2,areverse" \
        "$padded_file"

    # Convert to high-quality MP3 (320kbps)
    ffmpeg -y -loglevel quiet -i "$padded_file" -codec:a libmp3lame -b:a 320k "$mp3_file"

    # Clean up
    rm "$aiff_file" "$padded_file"

    echo "🎧 Created high-quality MP3: $mp3_file"
done

echo "✅ All MP3s ready in ././"
