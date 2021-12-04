<template>
  <terminal :lines="lines" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Terminal, { ILine } from './Terminal.vue';

const code = `public class AboutMe
{
    private List<Project> _projects = new List<Project>
    {
        new Project(name: "Steamcord",
                description: "SaaS offering targeted at game server owners",
                language: "C#, TypeScript",
                stack: "ASP.NET Core, EF Core, Express, Vue",
                uri: new Uri("https://steamcord.io")),

        new Project(name: "carbon-api",
                description: "API for generating images with Carbon (https://carbon.now.sh)",
                language: "Java"
                uri: new Uri("https://github.com/jacobmstein/carbon-api")),

        new Project(name: "tuner",
                description: "Minimalistic musical tuner in the browser",
                language: "JavaScript",
                stack: "Vue",
                uri: new Uri("https://jacobmstein.github.io/tuner"))

        // check out my GitHub for the rest!
    };

    public string Name => "Jacob Stein";
    public string Email => "jacob@stein.sh";
    public Uri GitHub => new Uri("https://github.com/jacobmstein");

    public ReadOnlyCollection<Project> Projects => _projects.AsReadOnly();
}`;

const ONE_SECOND = 1000;

const data = {
  lines: [
    {
      prompt: '$',
      text: 'ssh root@stein.sh',
      typed: true,
      typingDelay: ONE_SECOND * 2,
    },
    {
      delay: ONE_SECOND * 4,
      prompt: 'Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-90-generic x86_64)',
    },
    {
      prompt: 'root@stein.sh:~#',
      text: 'cat stein.sh/AboutMe.cs',
      typed: true,
      typingDelay: ONE_SECOND,
    },
    {
      delay: ONE_SECOND * 2,
      text: code,
      highlight: true,
      language: 'csharp',
    },
    {
      prompt: 'root@stein.sh:~#',
      text: 'logout',
      typed: true,
      typingDelay: ONE_SECOND * 8,
    },
    {
      delay: ONE_SECOND / 2,
      text: 'Connection to stein.sh closed.',
    },
    {
      prompt: '$',
    },
  ] as ILine[],
};

export default defineComponent({
  name: 'AboutMe',
  components: { Terminal },
  data: () => data,
});
</script>
