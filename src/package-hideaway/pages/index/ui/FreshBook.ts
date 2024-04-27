import HideawayService from '@api/hideaway.service';
import Taro from '@tarojs/taro';
import {
  Vector2,
  Vector3,
  Vector4,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  DirectionalLight,
  SpotLight,
  TextureLoader,
  Object3D,
  MeshStandardMaterial,
  Mesh,
  DoubleSide,
  WebGLRenderer,
  PlaneGeometry,
  LinearFilter,
  Raycaster,
  NearestFilter,
} from 'three-platformize';

const { windowWidth, windowHeight, pixelRatio } = Taro.getSystemInfoSync();
export const PAGE_WIDTH = 7.79;
export const PAGE_HEIGHT = 11.4;
export const BOOK_HEIGHT = 0.5;
export const COVER_SIZE_INCRE = 0.1;
export default class FressBook {
  public progress = {
    current: 150,
    speed: 0,
  };
  public camera;
  public parallax = true;
  public interactive = false;
  private scene;
  private renderer;
  private moveFactorDefaults: any[];
  private canvas;
  private pages: any[] = [];
  private getParaMat: (pageData, pageNumber) => any;
  private bookWrapper;
  private cover;
  private back;
  private frameId;
  constructor(canvas) {
    this.moveFactorDefaults = [
      new Vector2(0, 0),
      new Vector2(0.5, 0.5),
      new Vector2(2, 1),
      new Vector2(1, 1),
      new Vector2(1.5, 0.1),
      new Vector2(1.1, 0.1),
    ];
    this.canvas = canvas;
    this.canvas.width = 375;
    this.canvas.height = 812;
    this.getParaMat = (pageData, pageNumber) => {
      const textures: any[] = [];
      const moveFactors: any[] = [];
      const textureDimensions: any[] = [];

      pageData.forEach((frame, index) => {
        let texture = new TextureLoader().load(`${BUCKET_URL}${frame.attributes.url}`, () => {
          Taro.eventCenter.trigger('asset-loaded');
        });

        texture.minFilter = NearestFilter; //avoids texture resize on webgl1;

        texture.flipY = true;
        texture.premultiplyAlpha = true;
        moveFactors.push(this.moveFactorDefaults[index]);
        // if (frame.parallax) {
        //   moveFactors.push(
        //     new Vector2(frame.parallax.x, frame.parallax.y)
        //   );
        // } else {
        //   moveFactors.push(this.moveFactorDefaults[index]);
        // }
        textures.push(texture);
        textureDimensions.push(
          // new Vector4(
          //   frame.spriteSourceSize.x / frame.spriteSourceSize.w,
          //   frame.spriteSourceSize.y / frame.spriteSourceSize.h,
          //   frame.spriteSourceSize.w,
          //   frame.spriteSourceSize.h
          // )
          new Vector4(0, 0, 1158, 1140)
        );
      });

      const mat = new MeshStandardMaterial({
        map: textures[0],
        transparent: true,
        // metalness: 0.07,
        // roughness: 0.45,
        // roughnessMap: this.rough,
        // metalnessMap: this.bump,
        // normalMap: this.normalMap,
        premultipliedAlpha: true,
        normalScale: new Vector2(0.5, 0.5),
      });
      mat.onBeforeCompile = function (shader) {
        shader.uniforms.moveFactor = { value: moveFactors[1] };
        shader.uniforms.moveFactor2 = { value: moveFactors[2] };
        shader.uniforms.moveFactor3 = { value: moveFactors[3] };
        shader.uniforms.moveFactor4 = {
          value: moveFactors[4],
        };
        shader.uniforms.moveFactor5 = {
          value: moveFactors[5],
        };
        shader.uniforms.moveFactor6 = {
          value: moveFactors[6],
        };

        mat.map = textures[0];
        shader.uniforms.map2 = { value: textures[1] };
        shader.uniforms.map3 = { value: textures[2] };
        shader.uniforms.map4 = { value: textures[3] };
        shader.uniforms.map5 = { value: textures[4] };
        shader.uniforms.map6 = { value: textures[5] };

        shader.uniforms.map2Dimensions = { value: textureDimensions[1] };
        shader.uniforms.map3Dimensions = { value: textureDimensions[2] };
        shader.uniforms.map4Dimensions = { value: textureDimensions[3] };
        shader.uniforms.map5Dimensions = { value: textureDimensions[4] };
        shader.uniforms.map6Dimensions = { value: textureDimensions[5] };

        shader.uniforms.iResolution = {
          value: new Vector3(1158, 1140, 1),
        };
        shader.uniforms.map2Offset = { value: new Vector2(0, 0) };

        // mat.iResolution = shader.uniforms.iResolution;
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_pars_fragment>',
          `
             #ifdef USE_MAP
            
             uniform sampler2D map;
             uniform sampler2D map2;
             uniform sampler2D map3;
             uniform sampler2D map4;
             uniform sampler2D map5;
             uniform sampler2D map6;
             uniform vec2 moveFactor;
             uniform vec2 moveFactor2;
             uniform vec2 moveFactor3;
             uniform vec2 moveFactor4;
             uniform vec2 moveFactor5;
             uniform vec2 map2Offset;
             uniform vec4 map2Dimensions;
             uniform vec4 map3Dimensions;
             uniform vec4 map4Dimensions;
             uniform vec4 map5Dimensions;
             uniform vec4 map6Dimensions;
             uniform vec3 iResolution;
             #endif
            `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          `
             #ifdef USE_MAP
  
             vec4 texelColor = texture2D(map, vUv);
             vec4 texelColor2 = texture2D(map2, ((vUv.xy +map2Offset * moveFactor)  * (iResolution.xy / map2Dimensions.zw) - map2Dimensions.xy));
             vec4 texelColor3 = texture2D(map3, ((vUv.xy +map2Offset * moveFactor2)  * (iResolution.xy / map3Dimensions.zw) - map3Dimensions.xy));
             vec4 texelColor4 = texture2D(map4, ((vUv.xy +map2Offset * moveFactor3)  * (iResolution.xy / map4Dimensions.zw) - map4Dimensions.xy));
             vec4 texelColor5 = texture2D(map5, ((vUv.xy +map2Offset * moveFactor4)  * (iResolution.xy / map5Dimensions.zw) - map5Dimensions.xy));
             vec4 texelColor6 = texture2D(map6, ((vUv.xy +map2Offset * moveFactor5)  * (iResolution.xy / map6Dimensions.zw) - map6Dimensions.xy));
  
            //  texelColor = mapTexelToLinear(texelColor);
            //  texelColor2 = mapTexelToLinear(texelColor2);
            //  texelColor3 = mapTexelToLinear(texelColor3);
            //  texelColor4 = mapTexelToLinear(texelColor4);
            //  texelColor5 = mapTexelToLinear(texelColor5);
            //  texelColor6 = mapTexelToLinear(texelColor6);
             
             diffuseColor = mix(texelColor, texelColor2, texelColor2.a);
             diffuseColor = mix(diffuseColor, texelColor3, texelColor3.a);
             diffuseColor = mix(diffuseColor, texelColor4, texelColor4.a);
             diffuseColor = mix(diffuseColor, texelColor5, texelColor5.a);
             diffuseColor = mix(diffuseColor, texelColor6, texelColor6.a);
  
             #endif
            `
        );
        mat.userData.shader = shader;
      };

      return mat;
    };
    this.init();
  }
  public raycastCheck(px, py) {
    const x = ((px * pixelRatio) / this.canvas.width) * 2 - 1;
    const y = -((py * pixelRatio) / this.canvas.height) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(x, y), this.camera);
    const intersects = raycaster.intersectObjects([this.bookWrapper]);
    return intersects.length > 0;
  }
  public async init() {
    // this.rough = await new TextureLoader().load(Rough);
    // this.bump = await new TextureLoader().load(Bump);
    // this.normalMap = await new TextureLoader().load(Normal);
    const { data: bookData } = await HideawayService.getHidewayAsset();
    const [coverTex, backTex] = await Promise.all([
      new TextureLoader().loadAsync(
        `${BUCKET_URL}${bookData.attributes.bookcover.data.attributes.url}`
      ),
      new TextureLoader().loadAsync(
        `${BUCKET_URL}${bookData.attributes.bookback.data.attributes.url}`
      ),
    ]);
    Taro.eventCenter.trigger('asset-loaded');
    Taro.eventCenter.trigger('asset-loaded');
    coverTex.minFilter = NearestFilter;
    backTex.minFilter = NearestFilter;
    this.camera = new PerspectiveCamera(45, windowWidth / windowHeight, 0.25, 1000);
    this.camera.position.set(0, 0, 45);
    this.camera.lookAt(0, 0, 0);
    // this.camera.rotation.z = Math.PI / 2;

    this.scene = new Scene();
    // this.scene.background = new Color(0xf1f8fd);

    const light = new AmbientLight(0x404040); // soft white light
    this.scene.add(light);

    const dirLight = new DirectionalLight(0xffffff);
    dirLight.name = 'dirLight';

    dirLight.intensity = 1.1;
    dirLight.position.set(0, 20, 20);

    const spotLight = new SpotLight(0xffffff, 0.05);
    spotLight.position.set(20, 20, 40);
    spotLight.decay = 0;
    // spotLight.castShadow = true;
    // spotLight.shadow.radius = 2;
    // spotLight.shadow.camera.near = 1;
    // spotLight.shadow.camera.far = 150;
    // spotLight.shadow.mapSize.width = 4096;
    // spotLight.shadow.mapSize.height = 4096;
    this.scene.add(spotLight);
    this.scene.add(dirLight);

    this.bookWrapper = new Object3D();
    const COVER_WIDTH = 7.9;
    const COVER_HEIGHT = 12.7;
    this.cover = new Mesh(
      new PlaneGeometry(COVER_WIDTH, COVER_HEIGHT),
      new MeshStandardMaterial({
        transparent: false,
        map: coverTex,
        // metalness: 0.07,
        // roughness: 0.45,
        // roughnessMap: this.rough,
        // metalnessMap: this.bump,
        // normalMap: this.normalMap,
        premultipliedAlpha: true,
        side: DoubleSide,
        normalScale: new Vector2(0.5, 0.5),
        alphaTest: 1,
      })
    );
    let pos = this.cover.geometry.attributes.position;
    for (let index = 0; index < 4; index++) {
      pos.setX(index, pos.array[index * 3] + COVER_WIDTH * 0.5);
      pos.setZ(index, 0.01);
    }
    this.back = new Mesh(
      new PlaneGeometry(COVER_WIDTH, 14),

      new MeshStandardMaterial({
        transparent: true,
        map: backTex,
        // metalness: 0.07,
        // roughness: 0.45,
        // roughnessMap: this.rough,
        // metalnessMap: this.bump,
        // normalMap: this.normalMap,
        premultipliedAlpha: true,
        side: DoubleSide,
      })
    );
    pos = this.back.geometry.attributes.position;
    for (let index = 0; index < 4; index++) {
      pos.setX(index, pos.array[index * 3] + COVER_WIDTH * 0.5);
      pos.setZ(index, 0.01);
    }
    // this.back.geometry.vertices.forEach((v) => {
    //   v.x += COVER_WIDTH / 2;

    //   v.z = -0.01;
    // });

    // this.fakePages = new Mesh(
    //   new BoxGeometry(PAGE_WIDTH, PAGE_HEIGHT, BOOK_HEIGHT),

    //   new MeshBasicMaterial({ color: 0xdfdfdf })
    // );
    // this.fakePages.receiveShadow = true;
    // this.fakePages.castShadow = true;
    // this.fakePages.position.x = PAGE_WIDTH * 0.5 + 0.01;
    // this.fakePages.position.z = -BOOK_HEIGHT * 0.5 - 0.01;

    // this.bookCase = new Mesh(
    //   new PlaneGeometry(
    //     PAGE_WIDTH + COVER_SIZE_INCRE + BOOK_HEIGHT,
    //     PAGE_HEIGHT + COVER_SIZE_INCRE,
    //     2,
    //     1
    //   ),
    //   new MeshBasicMaterial({ color: 0xa0c3dc, side: DoubleSide })
    // );
    // this.bookCase.castShadow = true;
    // this.bookCase.geometry.vertices[0].x = 0;
    // this.bookCase.geometry.vertices[0].z = BOOK_HEIGHT;
    // this.bookCase.geometry.vertices[3].x = 0;
    // this.bookCase.geometry.vertices[3].z = BOOK_HEIGHT;
    // this.bookCase.geometry.vertices[2].x = PAGE_WIDTH + COVER_SIZE_INCRE;
    // this.bookCase.geometry.vertices[5].x = PAGE_WIDTH + COVER_SIZE_INCRE;
    // this.bookCase.position.z = -BOOK_HEIGHT - 0.02;

    this.bookWrapper.position.z = 0.6;
    this.bookWrapper.add(this.cover);
    this.bookWrapper.add(this.back);
    // this.bookWrapper.add(this.fakePages);
    // this.bookWrapper.add(this.bookCase);

    // const desktop = new Mesh(
    //   new PlaneGeometry(PAGE_WIDTH * 10, PAGE_HEIGHT * 10),
    //   new ShadowMaterial({ color: 0x000000, opacity: 0.2 })
    //   // new MeshBasicMaterial({ color: 0xf1f8fd })
    // );
    // desktop.receiveShadow = true;

    // this.scene.add(desktop);

    this.scene.add(this.bookWrapper);

    // model
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(windowWidth, windowHeight);
    this.renderer.shadowMap.enabled = true;
    const bookpages = bookData.attributes.bookpage.map((i) => i.frames.data);
    console.log(bookpages);
    bookpages.forEach(async (pageData, index) => {
      const mat = await this.getParaMat(pageData, index + 1);
      // const mat = new MeshStandardMaterial({ color: 0xfff000 });
      const mesh = new Mesh(
        new PlaneGeometry(PAGE_WIDTH * 2, PAGE_HEIGHT, 2, 1),
        // new ShapeGeometry(pageShape),
        mat
        // new MeshBasicMaterial({ map: texture, side: DoubleSide })
      );
      // mesh.castShadow = true;
      this.pages.push({
        mat,
        mesh: mesh,
      });
      this.bookWrapper.add(mesh);
    });

    this.animate(this.canvas);
  }
  public startRender() {
    this.animate(this.canvas);
  }
  public stopRender() {
    this.canvas.cancelAnimationFrame(this.frameId);
  }
  public unload() {}
  private animate(canvas) {
    this.frameId = canvas.requestAnimationFrame(() => {
      this.animate(canvas);
    });
    if (this.interactive) {
      if (this.progress.current >= 50) {
        this.camera.position.x = 0;
      } else {
        this.camera.position.x = ((50 - this.progress.current) / 50) * PAGE_WIDTH * 0.5;
      }
    }
    this.cover.rotation.y = -clamp(this.progress.current / 50, 0.015, 1) * Math.PI;
    this.pages.forEach((page, index) => {
      const pageProgress = clamp(this.progress.current - index * 50, 0, 100);
      // if (pageProgress < 0 || pageProgress >= 100) {
      //   return;
      // }
      page.mesh.position.z = Math.sin((pageProgress / 100) * Math.PI) * 0.1;
      this.parallax &&
        page.mat.userData.shader?.uniforms.map2Offset.value.set(
          (pageProgress / 100 - 0.5) * 0.3,
          0
        );

      const pos = page.mesh.geometry.attributes.position;
      // left page
      const l_start = 0;
      const l_rad = clamp((pageProgress - l_start) / 50, 0.001, 1) * Math.PI;
      const l_verticiesXPos = Math.cos(l_rad) * PAGE_WIDTH;
      const l_verticiesZPos = Math.sin(l_rad) * PAGE_WIDTH;

      pos.setX(0, l_verticiesXPos);
      pos.setX(3, l_verticiesXPos);
      pos.setZ(0, l_verticiesZPos);
      pos.setZ(3, l_verticiesZPos);
      // page.mesh.geometry.vertices[0].x = l_verticiesXPos;
      // page.mesh.geometry.vertices[0].z = l_verticiesZPos;
      // page.mesh.geometry.vertices[3].x = l_verticiesXPos;
      // page.mesh.geometry.vertices[3].z = l_verticiesZPos;

      // // right part

      const r_start = 50;
      const r_rad = clamp((pageProgress - r_start) / 50, 0, 0.999) * Math.PI;
      const r_verticiesXPos = Math.cos(r_rad) * PAGE_WIDTH;
      const r_verticiesZPos = Math.sin(r_rad) * PAGE_WIDTH;

      pos.setX(2, r_verticiesXPos);
      pos.setX(5, r_verticiesXPos);
      pos.setZ(2, r_verticiesZPos);
      pos.setZ(5, r_verticiesZPos);
      // page.mesh.geometry.vertices[2].x = r_verticiesXPos;
      // page.mesh.geometry.vertices[2].z = r_verticiesZPos;
      // page.mesh.geometry.vertices[5].x = r_verticiesXPos;
      // page.mesh.geometry.vertices[5].z = r_verticiesZPos;

      pos.needsUpdate = true;
    });
    this.renderer.render(this.scene, this.camera);
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
