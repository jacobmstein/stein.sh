<template>
  <div class="terminal">
    <template v-for="(line, index) in currentLines" :key="index">
      <highlightjs :class="getTerminalLineClass(index)"
          v-if="line.highlight"
          :language="line.language"
          :code="line.text" />
      <div :class="getTerminalLineClass(index)" v-else>
        <pre><span v-if="line.prompt">{{ line.prompt }} </span>{{ line.text }}</pre>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface ILine {
  code?: boolean;
  delay?: number;
  highlight?: boolean;
  prompt?: string;
  text?: string;
  typed?: boolean;
  typingDelay?: number;
}

function getUpdateInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default defineComponent({
  name: 'Terminal',
  props: {
    lines: {
      type: Object as PropType<ILine[]>,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      currentLines: [] as ILine[],
      finished: false,
    };
  },
  created() {
    this.increaseText();
  },
  methods: {
    getTerminalLineClass(index: number) {
      return index === this.currentIndex
        ? 'terminal__line--with-cursor'
        : 'terminal__line';
    },
    increaseText() {
      if (this.currentLines.length === 0) {
        this.addNextLine();
        return;
      }

      // the version of the line currently displayed, possibly incomplete
      const currentLine = this.currentLines[this.currentIndex];
      const currentLineLength = currentLine.text?.length as number;

      // the current text's final state
      const fullText = this.lines[this.currentIndex].text;

      if (!currentLine.typed || !fullText || currentLineLength === fullText?.length) {
        this.addNextLine();
      } else {
        currentLine.text = fullText?.substring(0, currentLineLength + 1);
        setTimeout(this.increaseText, getUpdateInterval(20, 150));
      }
    },
    addNextLine() {
      if (this.currentLines.length === this.lines.length) {
        return;
      }

      // if this is the first line to be pushed don't increment the index
      let newLine = this.currentLines.length === 0
        ? this.lines[0]
        // eslint-disable-next-line no-plusplus
        : this.lines[++this.currentIndex];

      if (newLine.typed) {
        // deep copy to change text safely
        newLine = JSON.parse(JSON.stringify(newLine));

        if (newLine.typed) {
          newLine.text = '';
        }
      }

      const update = () => {
        this.currentLines.push(newLine);
        if (newLine.typingDelay) {
          setTimeout(this.increaseText, newLine.typingDelay);
        } else {
          this.increaseText();
        }
      };

      if (newLine.delay) {
        setTimeout(update, newLine.delay);
      } else {
        update();
      }
    },
  },
});
</script>
