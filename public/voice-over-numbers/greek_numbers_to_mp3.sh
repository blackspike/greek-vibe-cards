#!/bin/bash

# Check for ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg not found. Install with: brew install ffmpeg"
    exit 1
fi

# Word list (Greek:English)
words=(
"μηδέν:0"
"ένα:1"
"δύο:2"
"τρία:3"
"τέσσερα:4"
"πέντε:5"
"έξι:6"
"επτά:7"
"οκτώ:8"
"εννέα:9"
"δέκα:10"
"έντεκα:11"
"δώδεκα:12"
"δεκατρία:13"
"δεκατέσσερα:14"
"δεκαπέντε:15"
"δεκαέξι:16"
"δεκαεπτά:17"
"δεκαοκτώ:18"
"δεκαεννέα:19"
"είκοσι:20"
"είκοσι τέσσερα:24"
"είκοσι επτά:27"
"τριάντα δύο:32"
"τριάντα πέντε:35"
"τριάντα οκτώ:38"
"σαράντα τρία:43"
"σαράντα επτά:47"
"πενήντα δύο:52"
"πενήντα έξι:56"
"εξήντα τρία:63"
"εξήντα οκτώ:68"
"εβδομήντα δύο:72"
"εβδομήντα επτά:77"
"εβδομήντα οκτώ:78"
"ογδόντα τέσσερα:84"
"ογδόντα εννέα:89"
"ενενήντα τρία:93"
"ενενήντα επτά:97"
"εκατό πέντε:105"
"εκατό είκοσι τρία:123"
"εκατό πενήντα έξι:156"
"διακόσια δεκαπέντε:215"
"διακόσια ογδόντα επτά:287"
"τριακόσια σαράντα δύο:342"
"τετρακόσια είκοσι:420"
"πεντακόσια τριάντα τρία:533"
"εξακόσια σαράντα πέντε:645"
"επτακόσια ογδόντα οκτώ:788"
"οκτακόσια ενενήντα εννέα:899"
"εννιακόσια πενήντα:950"
"εκατό:100"
"τριάντα:30"
"σαράντα:40"
"πενήντα:50"
"εξήντα:60"
"εβδομήντα:70"
"ογδόντα:80"
"ενενήντα:90"
"εκατό:100"
"χίλια:1000"
"εκατομμύριο:1000000"
"δισεκατομμύριο:1000000000"
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
